// @flow

import React, { useCallback, type Element } from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import _ from 'underscore';

type Attribute = {
  name: string,
  qualification?: {
    object: string,
    group: string
  },
  renderValue?: (item: any) => Element<any> | string | null
}

type Props = {
  attributes: Array<Attribute>,
  item: any
};

const QUALIFICATIONS_SEPARATOR = ', ';

const AttributesGrid = (props: Props) => {
  /**
   * Returns the value for the passed qualification attributes.
   *
   * @type {function({object: *, group: *, formField: *}): *}
   */
  const getQualificationValue = useCallback(({ object, group, formField }) => {
    let value;

    if (props.item) {
      const params = {
        value_list_object: object,
        value_list_group: group
      };

      if (formField) {
        _.extend(params, { form_field: formField });
      }

      const qualifications = _.where(props.item.qualifications, params);

      if (qualifications) {
        value = _.map(
          qualifications,
          (qualification) => qualification.value_list.human_name
        ).join(QUALIFICATIONS_SEPARATOR);
      }
    }

    return value;
  }, [props.item]);

  /**
   * Renders the attribute for the current record.
   *
   * @type {function(*): *}
   */
  const renderAttributeValue = useCallback((attribute) => {
    let value;

    if (attribute.renderValue) {
      value = attribute.renderValue();
    } else if (attribute.qualification) {
      value = getQualificationValue(attribute.qualification);
    } else {
      value = props.item && props.item[attribute.name];
    }

    return value;
  }, [getQualificationValue, props.item]);

  /**
   * Renders the row for the passed attribute.
   *
   * @type {(function(*): (null|*))|*}
   */
  const renderRow = useCallback((attribute, index) => {
    const value = renderAttributeValue(attribute);

    // By default, hide any attribute with an empty value, unless otherwise specified
    if (!(value || attribute.renderEmpty)) {
      return null;
    }

    return (
      <Grid.Row
        columns='equal'
        key={index}
      >
        <Grid.Column
          className='label'
          floated='right'
          textAlign='right'
          width={8}
        >
          { attribute.label }
        </Grid.Column>
        <Grid.Column
          width={8}
          floated='left'
          textAlign='left'
        >
          { value }
        </Grid.Column>
      </Grid.Row>
    );
  }, [renderAttributeValue]);

  return (
    <Segment>
      <Grid
        className='attributes-grid'
        divided
      >
        { _.map(props.attributes, renderRow.bind(this)) }
      </Grid>
    </Segment>
  );
};

export default AttributesGrid;
