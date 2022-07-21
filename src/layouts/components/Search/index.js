import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import HeadlessTippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

import * as searchService from '~/services/searchService';
import { useDebounce } from '~/hooks';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItem from '~/components/AccountItem';
import { LoadingIcon, SearchIcon } from '~/components/icons';
import styles from './Search.module.scss';

const cx = classNames.bind(styles);

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);

    const inputRef = useRef();

    const debouncedValue = useDebounce(searchValue, 500);

    useEffect(() => {
        if (!debouncedValue.trim()) {
            setSearchResult([]);
            return;
        }

        const fetchApi = async () => {
            setLoading(true);

            const result = await searchService.search(debouncedValue);

            setSearchResult(result);

            setLoading(false);
        };

        fetchApi();
    }, [debouncedValue]);

    const handleClear = () => {
        setSearchValue('');
        setSearchResult([]);
        inputRef.current.focus();
    };

    const handleHideResult = () => {
        setShowResult(false);
    };

    const handleShowResult = () => {
        setShowResult(true);
    };

    const handleChange = (e) => {
        const searchValue = e.target.value;

        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
    };

    return (
        // Using a wrapper <div> tag around the reference element
        // solves this by creating a new parentNode context.
        <div>
            <HeadlessTippy
                visible={showResult && searchResult.length > 0}
                interactive={true}
                render={(attrs) => (
                    <div className={cx('search__result')} tabIndex="-1" {...attrs}>
                        <PopperWrapper className="scrollY">
                            <label className={cx('search__label')}>Accounts</label>
                            {searchResult.map((result) => (
                                <AccountItem key={result.id} data={result}></AccountItem>
                            ))}
                        </PopperWrapper>
                    </div>
                )}
                onClickOutside={handleHideResult}
            >
                <div className={cx('search')}>
                    <input
                        ref={inputRef}
                        value={searchValue}
                        placeholder="Search accounts and videos"
                        spellCheck={false}
                        onChange={handleChange}
                        onFocus={handleShowResult}
                    />
                    {!!searchValue && !loading && (
                        <button className={cx('search__clear')} onClick={handleClear}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    )}
                    {loading && (
                        <button className={cx('search__loading')}>
                            <LoadingIcon width="1.6rem" height="1.6rem" />
                        </button>
                    )}
                    <button className={cx('search__btn')} onMouseDown={(e) => e.preventDefault()}>
                        <SearchIcon width="2.4rem" height="2.4rem" />
                    </button>
                </div>
            </HeadlessTippy>
        </div>
    );
}

export default Search;
