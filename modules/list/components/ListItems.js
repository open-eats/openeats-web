import React from 'react'
import {
  SortableContainer,
  SortableElement,
} from 'react-sortable-hoc'
import PropTypes from 'prop-types'

import { Checkbox } from '../../common/components/FormComponents'
import ListFooter from './ListFooter'
import ListItem from './ListItem'
import AddItem from './AddItem'

import {
  ALL_ITEMS,
  ACTIVE_ITEMS,
  COMPLETED_ITEMS
} from '../constants/ListStatus'

export default class ListItems extends React.Component {

  slidingList: ?HTMLElement;

  constructor(props) {
    super(props);

    this.state = {
      nowShowing: ALL_ITEMS,
      editing: null,
    };
  }

  toggleEdit = (id) =>  {
    this.setState({editing: id});
  };

  toggleAll = (name, checked) =>  {
    this.props.itemActions.toggleAll(
        this.props.items,
        checked,
        this.props.activeListID
    )
  };

  onSortEnd = ({oldIndex, newIndex}) => {
    let items = [...this.props.items];
    let item = items.splice(oldIndex, 1)[0];
    items.splice(newIndex, 0, item);

    this.props.itemActions.orderAll(
        items,
        this.props.activeListID
    );
  };

  filterStatus = (status) =>  {
    this.setState({nowShowing: status});
  };

  render() {
    let footer;
    let main;
    let items = this.props.items;

    let shownItems = items.filter(function (item) {
      switch (this.state.nowShowing) {
      case ACTIVE_ITEMS:
        return !item.completed;
      case COMPLETED_ITEMS:
        return item.completed;
      default:
        return true;
      }
    }, this);

    const SortableItem = SortableElement(({ item }) =>
      <ListItem
        key={ item.id }
        item={ item }
        sortable={ this.state.nowShowing === ALL_ITEMS }
        editing={ this.state.editing === item.id }
        onToggleEdit={ this.toggleEdit }
        onToggle={ this.props.itemActions.toggle }
        onDestroy={ this.props.itemActions.destroy }
        onSave={ this.props.itemActions.save }
      />
    );

    const SortableList = SortableContainer(({ children }) =>
      <ul className="item-list">
        { children }
      </ul>
    );

    let activeListCount = items.reduce(function (accum, item) {
      return item.completed ? accum : accum + 1;
    }, 0);

    let completedCount = items.length - activeListCount;

    if (activeListCount || completedCount) {
      footer =
        <ListFooter
          itemCount={ activeListCount }
          completedCount={ completedCount }
          activeFilter={ this.state.nowShowing }
          onClearCompleted={ this.props.itemActions.clearCompleted.bind(this, items) }
          onFilterStatus={ this.filterStatus }
        />;
    }

    /* Include a second list tag that we can attach the cloned list items to
     * so that it will have the same styling.
     */
    if (items.length) {
      main = (
        <section className="main">
          <Checkbox
            size="toggle-all"
            checked={ activeListCount === 0 }
            change={ this.toggleAll }
          />
          <ul
            ref={ ref => this.slidingList = ref }
            className="item-list"
          />
          <SortableList
            onSortEnd={ this.onSortEnd }
            axis="y"
            lockAxis="y"
            useDragHandle
            lockToContainerEdges
            helperContainer={ () => this.slidingList }
          >
            { shownItems.map((item, index) =>
              <SortableItem
                key={ item.id }
                index={ index }
                item={ item }
              />
            )}
          </SortableList>
        </section>
      );
    }

    return (
      <div>
        <header className="header">
          <AddItem
            addItem={ this.props.itemActions.add }
            listLength={ this.props.items.length }
          />
        </header>
        { main }
        { footer }
      </div>
    );
  }
}

ListItems.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    order: PropTypes.number.isRequired,
  }).isRequired).isRequired,
  activeListID: PropTypes.number,
  itemActions: PropTypes.object.isRequired,
};
