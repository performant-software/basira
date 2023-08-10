// @flow

import React from 'react';
import {
  Header,
  Icon,
  Image,
  List
} from 'semantic-ui-react';
import _ from 'underscore';
import type { Attachment } from '../types/Attachment';
import Qualifiables from '../utils/Qualifiables';
import { useTranslation } from 'react-i18next';

type ItemProps = {
  icon?: string,
  label: string,
  value: ?string
};

const Item = (props: ItemProps) => {
  if (_.isEmpty(props.value)) {
    return null;
  }

  return (
    <List.Item>
      <Image>
        { props.icon && (
          <Icon
            circular
            inverted
            name={props.icon}
            size='large'
            verticalAlign='middle'
          />
        )}
      </Image>
      <List.Content>
        <Header
          color='grey'
          sub
        >
          { props.label }
        </Header>
        { props.value }
      </List.Content>
    </List.Item>
  );
};

Item.defaultProps = {
  icon: undefined
};

type Props = {
  item: Attachment
};

const ImageInfo = (props: Props) => {
  const { t } = useTranslation();

  const imageRights = Qualifiables.getValueListValue(props.item, 'Attachment', 'Image Rights');
  const imageSource = Qualifiables.getValueListValue(props.item, 'Attachment', 'Image Source');
  const photographer = Qualifiables.getValueListValue(props.item, 'Attachment', 'Photographer');

  if (!(imageRights || imageSource || photographer)) {
    return null;
  }

  return (
    <List
      horizontal
    >
      <Item
        icon='law'
        label={t('ImageInfo.labels.imageRights')}
        value={imageRights}
      />
      <Item
        icon='image'
        label={t('ImageInfo.labels.imageSource')}
        value={imageSource}
      />
      <Item
        icon='camera'
        label={t('ImageInfo.labels.photographer')}
        value={photographer}
      />
    </List>
  );
};

export default ImageInfo;
