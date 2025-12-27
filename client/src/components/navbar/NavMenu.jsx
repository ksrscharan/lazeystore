import { Menu, Text } from '@mantine/core'
import React, { useEffect } from 'react'
import { OutlineButton } from '../buttons/Buttons'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IconCategory } from '@tabler/icons-react';
import { fetchNavigationData } from '../../redux/thunk/products';

function NavMenu() {
    const { categories, subCategories } = useSelector((state) => state.products);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchNavigationData())
    }, [])

    return (
        <Menu >
            <Menu.Target>
                <OutlineButton rightSection={<IconCategory />}>Categories</OutlineButton>
            </Menu.Target>
            <Menu.Dropdown>
                {categories?.map((category) =>
                    <Menu.Sub position='left-start' offset={5} openDelay={100} closeDelay={200}>

                        <Menu.Sub.Target>
                            <Menu.Sub.Item onClick={() => navigate(`/products/category/${category}?page=1&limit=10`)}>{category}</Menu.Sub.Item  >
                        </Menu.Sub.Target>
                        <Menu.Sub.Dropdown>
                            {subCategories?.[category]?.length && subCategories[category]?.map((scat, ind) => (
                                <Menu.Item key={ind}><Text onClick={() => navigate(`/products/category/${category}/${scat}?page=1&limit=10`)}>{scat}</Text></Menu.Item>
                            ))}
                        </Menu.Sub.Dropdown>
                    </Menu.Sub>
                )}
            </Menu.Dropdown>
        </Menu>
    )
}

export default NavMenu