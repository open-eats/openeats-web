import React from 'react'
import {
  injectIntl,
  defineMessages,
} from 'react-intl';

import { TextArea } from '../../common/components/FormComponents'
import Directions from '../../recipe/components/Directions'
import TabbedView from './TabbedView'

class DirectionBox extends React.Component {
  render() {
    const { formatMessage } = this.props.intl;
    const messages = defineMessages({
      info_title: {
        id: 'recipe.create.dir.info_title',
        description: 'info_title',
        defaultMessage: 'Direction Help',
      },
      info_desc: {
        id: 'recipe.create.dir.info_desc',
        description: 'info_desc',
        defaultMessage: 'Each Direction should be only its own line. Click the Preview to see what the Directions will look like.',
      },
    });

    const help = {
      infoTitle: formatMessage(messages.info_title),
      infoDesc: formatMessage(messages.info_desc)
    };

    return (
      <TabbedView { ...{...this.props, ...help} }>
        <TextArea
          name={ this.props.name }
          rows="8"
          change={ this.props.change }
          value={ this.props.data }
        />
        <Directions data={ this.props.data }/>
      </TabbedView>
    )
  }
}

export default injectIntl(DirectionBox)
