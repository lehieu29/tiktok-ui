import { useState } from 'react';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import PropTypes from 'prop-types';

import styles from './Menu.module.scss';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import MenuItem from './MenuItem';
import Header from './Header';

const cx = classNames.bind(styles);

const defaultFn = () => {};

function Menu({ children, items = [], hideOnClick = false, onChange = defaultFn }) {
    const [history, setHistory] = useState([{ data: items }]);

    const currHistory = history[history.length - 1];

    const renderItems = () => {
        return currHistory.data.map((item, index) => {
            const isParent = !!item.children;

            return (
                <MenuItem
                    key={index}
                    data={item}
                    onClick={() => {
                        if (isParent) {
                            // Next page
                            setHistory((prev) => [...prev, item.children]);
                        } else {
                            onChange(item);
                        }
                    }}
                />
            );
        });
    };

    const handleBack = () => {
        setHistory((prev) => prev.slice(0, prev.length - 1));
    };

    const handleResetToFirstPage = () => {
        setHistory((prev) => prev.slice(0, 1));
    };

    const renderResult = (attrs) => (
        <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
            <PopperWrapper className={cx('menu-popper')}>
                {history.length > 1 && <Header title={currHistory.title} onBack={handleBack}></Header>}

                <div className={cx('menu__body')}>{renderItems()}</div>
            </PopperWrapper>
        </div>
    );

    return (
        <Tippy
            delay={[0, 800]}
            offset={[12, 14]}
            hideOnClick={hideOnClick}
            interactive={true}
            placement="bottom-end"
            render={renderResult}
            onHide={handleResetToFirstPage}
        >
            {children}
        </Tippy>
    );
}

Menu.propTypes = {
    children: PropTypes.node,
    items: PropTypes.array,
    hideOnClick: PropTypes.bool,
    onChange: PropTypes.func,
};

export default Menu;
