import React from 'react'
import {
  injectIntl,
  defineMessages,
} from 'react-intl';

import {
  Input,
  TextArea,
} from '../../common/components/FormComponents'

class RecipeForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rating: '',
      comment: ''
    };
  }

  update = (n,v) => {
    let newState = {};
    newState[n] = v;
    this.setState(newState)
  };

  submit = e => {
    e.preventDefault();
    this.props.ratingActions.add(
        this.state.rating,
        this.state.comment,
        this.props.recipeId
    );
    this.setState({ rating: '', comment: '' })
  };

  render() {
    const { formatMessage } = this.props.intl;
    const messages = defineMessages({
      name_label: {
        id: 'newRating.create.name_label',
        description: 'Recipe name label',
        defaultMessage: 'Recipe name',
      },
      rating_placeholder: {
        id: 'newRating.create.rating_placeholder',
        description: 'Rating placeholder',
        defaultMessage: 'Rate this recipe from 0 to 5',
      },
      rating_label: {
        id: 'newRating.create.rating_label',
        description: 'Rating label',
        defaultMessage: 'Rating',
      },
      rating_comment_placeholder: {
        id: 'newRating.create.rating_comment_placeholder',
        description: 'Rating placeholder',
        defaultMessage: 'Leave a comment!',
      },
      rating_comment_label: {
        id: 'newRating.create.rating_comment_label',
        description: 'Rating label',
        defaultMessage: 'Comments',
      },
      submit: {
        id: 'newRating.create.submit',
        description: 'Submit recipe button',
        defaultMessage: 'Comment',
      }
    });

    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-5 col-md-12">
            <Input
              name="rating"
              type="number"
              label={ formatMessage(messages.rating_label) }
              placeholder={ formatMessage(messages.rating_placeholder) }
              change={ this.update }
              value={ this.state.rating }
            />
          </div>
        </div>
        <div className="row">
          <div className="col-xs-11">
            <TextArea
              name="comment"
              rows="4"
              label={ formatMessage(messages.rating_comment_label) }
              placeholder={ formatMessage(messages.rating_comment_placeholder) }
              change={ this.update }
              value={ this.state.comment }
            />
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <button
              className="btn btn-primary"
              onClick={ this.submit }>
                { formatMessage(messages.submit) }
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default injectIntl(RecipeForm);