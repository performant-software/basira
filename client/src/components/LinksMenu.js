// @flow

import React, { type Node } from 'react';
import { Menu } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';

type Props = {
  children?: Node,
  position?: 'right' | 'left'
};

const LinksMenu = (props: Props) => {
  const { t } = useTranslation();

  return (
    <Menu.Menu
      position={props.position}
    >
      <Menu.Item
        as='a'
        content={t('LinksMenu.labels.basira')}
        target='_blank'
        href='https://basiraproject.org/'
      />
      <Menu.Item
        as='a'
        content={t('LinksMenu.labels.contact')}
        href='mailto:info@basiraproject.org'
      />
      <Menu.Item
        as='a'
        content={t('LinksMenu.labels.contribute')}
        target='_blank'
        href='https://forms.gle/HgyDRNvh2DZVfCef9'
      />
      { props.children }
    </Menu.Menu>
  );
};

LinksMenu.defaultProps = {
  children: undefined,
  position: 'left'
};

export default LinksMenu;
