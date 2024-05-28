import React from 'react';
import { usePopularCategory } from "../Model/usePopularCategory";
import defaultClasses from "./popularCategories.module.css";
import { Link } from "react-router-dom";
import {FormattedMessage} from "react-intl";
import { string, shape } from 'prop-types';

/**
 *
 * @param props
 * @returns {JSX.Element|null}
 * @constructor
 */
const PopularCategories = (props) => {
    const classes = {};
    const {items} = usePopularCategory();
    console.log(items);
    if (!items) return (<div>Loading...</div>);
    return (
        <div className={classes.root} data-cy="PopularCategories-root">
            <h2 className={classes.title}>
                <FormattedMessage
                    id={'popularCategories.title'}
                    defaultMessage={"Popular Categories"}
                />
            </h2>
            <div className={classes.items}>
                {items.map(item =>
                    item.popular_category_image && item.show_popular_category &&
                    <div className={classes.item} data-cy="PopularCategory-root">
                        <Link to={item.url_path} className={classes.link}>
                            <span className={classes.linkTitle}>
                                <FormattedMessage
                                    id={'popularCategories.link'}
                                    defaultMessage={"view more"}
                                />
                            </span>
                        </Link>
                        <img
                            alt={item.name}
                            height={200}
                            width={300}
                            src={item.popular_category_image}
                            classes={{root: classes.container}}
                        />
                        <p className={classes.itemName}>
                            {item.name}
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}
/**
 *
 * @type {{data: *}}
 */
PopularCategories.propTypes = {
    classes: shape({
        root: string,
        title: string,
        items: string,
        item: string,
        link: string,
        linkTitle: string,
        container: string,
        itemName: string
    })
};

export default PopularCategories;
