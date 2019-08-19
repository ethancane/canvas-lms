/*
 * Copyright (C) 2019 - present Instructure, Inc.
 *
 * This file is part of Canvas.
 *
 * Canvas is free software: you can redistribute it and/or modify it under
 * the terms of the GNU Affero General Public License as published by the Free
 * Software Foundation, version 3 of the License.
 *
 * Canvas is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU Affero General Public License for more
 * details.
 *
 * You should have received a copy of the GNU Affero General Public License along
 * with this program. If not, see <http://www.gnu.org/licenses/>.
 */

import Billboard from '@instructure/ui-billboard/lib/components/Billboard'
import Button from '@instructure/ui-buttons/lib/components/Button'
import closedCaptionLanguages from '../../../../shared/closedCaptionLanguages'
import I18n from 'i18n!assignments_2_text_entry'
import {IconAttachMediaLine} from '@instructure/ui-icons'
import React from 'react'
import UploadMedia from '@instructure/canvas-media'
import {UploadMediaStrings, MediaCaptureStrings} from '../../../../shared/UploadMediaTranslations'
import View from '@instructure/ui-layout/lib/components/View'

const languages = Object.keys(closedCaptionLanguages).map(key => {
  return {id: key, label: closedCaptionLanguages[key]}
})

export default class MediaAttempt extends React.Component {
  state = {
    mediaModalOpen: false,
    mediaObjectUrl: null
  }

  onDismiss = mediaObject => {
    this.setState({mediaModalOpen: false, mediaObjectUrl: mediaObject.embedded_iframe_url})
  }

  render() {
    if (this.state.mediaObjectUrl) {
      // TODO: figure out how the heck we want to style this thing.
      return <iframe title="meidathings" src={this.state.mediaObjectUrl} />
    }

    return (
      <View as="div" borderWidth="small">
        <UploadMedia
          onDismiss={this.onDismiss}
          contextId={this.props.assignment.env.courseId}
          contextType="course"
          open={this.state.mediaModalOpen}
          tabs={{embed: false, record: true, upload: true}}
          uploadMediaTranslations={{UploadMediaStrings, MediaCaptureStrings}}
          liveRegion={() => document.getElementById('flash_screenreader_holder')}
          languages={languages}
        />
        <Billboard
          heading={I18n.t('Add Media')}
          hero={<IconAttachMediaLine color="brand" />}
          message={
            <Button
              size="small"
              variant="primary"
              onClick={() => this.setState({mediaModalOpen: true})}
            >
              {I18n.t('Record/Upload')}
            </Button>
          }
        />
      </View>
    )
  }
}
