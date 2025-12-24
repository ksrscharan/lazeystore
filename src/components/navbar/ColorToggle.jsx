import { IconMoonStars, IconSun } from '@tabler/icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../../redux/reducers/themeSlice';


function ColorToggle() {
    const dispatch = useDispatch();
  const mode = useSelector((state) => state.theme.mode);

    return (
        <>
            <IconMoonStars
                display={mode == 'light' ? 'inherit' : 'none'}
                onClick={() => {
                    dispatch(toggleTheme());
                }}
                style={{ cursor: 'pointer', transition: 'display 0.5s linear' }}
            />
            <IconSun
                display={mode == 'light' ? 'none' : 'inherit'}
                onClick={() => {
                    dispatch(toggleTheme());
                }}
                style={{ cursor: 'pointer', transition: 'display 0.5s linear' }}
            />
        </>
    )
}

export default ColorToggle