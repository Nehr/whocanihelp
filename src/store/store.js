export const store = {
  state: {
    items: [],
  },
  addItem(newItem) {
    const found = this.state.items.some((item) => item.id === newItem.id);
    if (!found) this.state.items.push(newItem);
  },
};
