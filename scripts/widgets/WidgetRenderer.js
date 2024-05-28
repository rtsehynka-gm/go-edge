import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

/**
 *
 * @param props
 * @returns {null|Function}
 * @constructor
 */
const WidgetRenderer = async (props) => {
  const {
    Component, data,
  } = props;
  /**
     * We want the component re-rendered only if its own data has changed,
     * that's why `getDeps` is used below
     *
     * @type {null|Function}
     */
  const componet = useMemo(async () => {
    const component = (
            <Component
                data={data}
            />
    );
  }, data);
  return await (<Component
    data={data}
  />);
};

WidgetRenderer.propTypes = {
  component: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

export default WidgetRenderer;
