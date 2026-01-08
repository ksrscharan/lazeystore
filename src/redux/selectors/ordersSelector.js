import { createSelector } from '@reduxjs/toolkit';

const selectOrdersState = (state) => state.orders;

export const selectOrderEntities = createSelector(
    [selectOrdersState],
    (ordersState) => ordersState.entities.orders
);

export const selectAllOrders = createSelector(
    [(state) => state.orders.allOrders, (state) => state.orders.entities.orders],
    (allIds, entities) => {
        if (!allIds) return [];
        return allIds.map(id => entities[id]);
    }
);

export const selectLatestOrderId = createSelector(
    [selectOrdersState],
    (ordersState) => ordersState.latestOrderId
);

export const selectLatestOrder = createSelector(
    [selectOrderEntities, selectLatestOrderId],
    (entities, latestId) => entities[latestId] || null
);

export const selectCurrentOrder = createSelector(
    [selectOrderEntities, (state) => state.orders.currentOrderId],
    (entities, currentId) => entities[currentId] || null
);