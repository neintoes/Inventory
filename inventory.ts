enum ToolbarColorAttribute {
    //% block="outline"
    BoxOutline,
    //% block="selected outline"
    BoxSelectedOutline,
    //% block="background"
    BoxBackground,
    //% block="text"
    BoxText
}
enum InventoryColorAttribute {
    //% block="outline"
    InventoryOutline,
    //% block="selected outline"
    InventorySelectedOutline,
    //% block="background"
    InventoryBackground,
    //% block="text"
    InventoryText
}
enum ItemTextAttribute {
    //% block="name"
    Name,
    //% block="description"
    Description,
    //% block="tooltip"
    Tooltip
}
enum ItemNumberAttribute {
    //% block="value"
    Value,
    //% block="quantity"
    Quantity,
    //% block="cooldown"
    Cooldown,
    //% block="duration"
    Duration
}
enum ToolbarNumberAttribute {
    //% block="selected index"
    SelectedIndex,
    //% block="max items"
    MaxItems
}
enum InventoryNumberAttribute {
    //% block="selected index"
    SelectedIndex,
    //% block="max items"
    MaxItems
}
namespace Inventory {
    /**
     * Create an item_pool for storing Inventory Items.
     */
    export class ItemPool {
        /**
         * Define (extra) variables that are part of the class.
         */
        private _items: Item[];

        /**
         * Make an item pool.
         */
        constructor(items: Item[] = []) {
            this._items = items;
        }

        /**
         * Get the items in the toolbar.
         */
        public get items() {
            return this._items;
        }

        /**
         * Get the items in the item pool. Only rewrapped for blocks.
         * @return: The items, as an array of Item.
         */
        //% block="item pool %Inventory(item_pool) get items"
        //% weight=80
        //% group="Item Pool"
        //% hidden
        public getItems() {
            return this.items;
        }

        /**
         * Set the items in the toolbar.
         */
        public set items(new_items: Item[]) {
            this._items = new_items;
        }

        /**
         * Set the items in the item pool. Only rewrapped for blocks.
         */
        //% block="item pool %Inventory(item_pool) set items to %new_items"
        //% new_items.shadow="lists_create_with"
        //% weight=90
        //% group="Item Pool"
        //% hidden
        public setItems(new_items: Item[]) {
            this.items = new_items;
        }

        /**
         * Gets an item in the toolbar by its name property.
         */
        private getItemByName(item_name: string) {
            return this._items.find(x => x.name == item_name);
        }

        /**
         * Get an item from the item pool by its name.
         * @param name: The name of the item to retrieve.
         * @return: The matching Item object, or null if not found.
         */
        //% block="item pool %Inventory(item_pool) get item called %name"
        //% weight=60
        //% group="Item Pool"
        //% hidden
        public getItem(name: string): Item {
            return this.getItemByName(name);
        }

        //% block="toolbar %Inventory(toolbar) add item $item || with quantity $quantityToAdd"
        //% expandableArgumentMode="toggle"
        //% group="Item Pool"
        //% weight=40
        public addItem(item: Inventory.Item): void {
            let existingItem = this._items.find(x => x.name === item.name);
            if (existingItem) {
                return
            } else {
                this._items.push(item);
            }
        }

        /**
         * Check if item exists in the item pool.
         * @param name: The name of the item to check for.
         * @return: A boolean representing the existence of the item in the item pool.
         */
        //% block="item pool %Inventory(item_pool) contains item %name"
        //% weight=60
        //% group="Item Pool"
        //% hidden
        public itemInPool(name: string): boolean {
            let output: boolean;
            this.getItemByName(name)? output = true: output = false;
            return output;
        }
    }

    /**
     * Create a new item pool - for blocks.
     * @return: A new Item Pool.
     */
    //% block="create item pool with items %items"
    //% blockSetVariable=item_pool
    //% items.shadow="lists_create_with"
    //% max_items.dfl=3
    //% weight=100
    //% group="Item Pool"
    //% hidden
    export function createItemPool(items: Item[]) {
        return new ItemPool(items);
    }

    // ------------------------------------------------------------------

    /**
     * Create a simple item which holds a single image and some text. 
     * Can also contain a description which isn't used by the Inventory extension. 
     */
    export class Item {
        /**
         * Define variables that are part of the class. 
         */
        public name: string;
        public image: Image;
        public description: string;
        public tooltip: string = "";
        public quantity: number;
        public value: number;
        public duration: number;
        public cooldown: number;

        /**
         * Make a simple item.
         * @param name: The name of the item. 
         * @param image: The image of the item. Must be 16x16, otherwise it will not draw
         *  properly. 
         * @param quantity: The quantity of the item, not required and defaults to '1'.
         */
        constructor(name: string, image: Image, quantity: number = 1, value: number = 1, cooldown: number = 1) {
            this.name = name;
            this.image = image;
            this.quantity = quantity;
            this.value = value;
            this.cooldown = cooldown;
        }

        /**
         * Set the name or description of the item.
         * @param attribute: A property of the ItemTextAttribute enum.
         * @param value: The new text of the item.
         */
        //% block="item %Inventory(Item) set %attribute to %value"
        //% weight=20
        //% group="Item"
        //% hidden
        set_text(attribute: ItemTextAttribute, value: string) {
            if (attribute == ItemTextAttribute.Name) {
                this.name = value;
            } else if (attribute == ItemTextAttribute.Description) {
                this.description = value;
            } else if (attribute == ItemTextAttribute.Tooltip) {
                this.tooltip = value;
            }
        }

        /**
         * Get the name of description of the item.
         * @return: The text.
         */
        //% block="item %Inventory(Item) get %attribute"
        //% weight=10
        //% group="Item"
        //% hidden
        get_text(attribute: ItemTextAttribute) {
            if (attribute == ItemTextAttribute.Name) {
                return this.name;
            } else if (attribute == ItemTextAttribute.Description) {
                return this.description;
            } else if (attribute == ItemTextAttribute.Tooltip) {
                return this.tooltip;
            }
            return "";
        }

        /**
         * Set the value or quantity of the item.
         * @param attribute: A property of the ItemNumberAttribute enum.
         * @param value: The new number of the item.
         */
        //% block="item %Inventory(Item) set %attribute to %value"
        //% weight=20
        //% group="Item"
        //% hidden
        set_number(attribute: ItemNumberAttribute, value: number) {
            if (attribute == ItemNumberAttribute.Value) {
                this.value = value;
            } else if (attribute == ItemNumberAttribute.Quantity) {
                this.quantity = value;
            }
        }

        /**
         * Change the value or quantity by a number.
         * @param attribute: A property of the ItemNumberAttribute enum.
         * @param value: The amount to change the value by.
         */
        //% block="item %Inventory(Item) change %attribute by %value"
        //% weight=20
        //% group="Item"
        //% hidden
        change_number(attribute: ItemNumberAttribute, value: number) {
            if (attribute == ItemNumberAttribute.Value) {
                this.value += value;
            } else if (attribute == ItemNumberAttribute.Quantity) {
                this.quantity += value;
            }
        }

        /**
         * Get the value or quantity of the item.
         * @return: The value.
         */
        //% block="item %Inventory(Item) get %attribute"
        //% weight=10
        //% group="Item"
        //% hidden
        get_number(attribute: ItemNumberAttribute) {
            if (attribute == ItemNumberAttribute.Value) {
                return this.value;
            } else if (attribute == ItemNumberAttribute.Quantity) {
                return this.quantity;
            }
            return 0;
        }

        /**
         * Set the image of the item.
         * @param new_image: The new image.
         */
        //% block="item %Inventory(Item) set image to %new_image"
        //% new_image.shadow=screen_image_picker
        //% weight=40
        //% group="Item"
        //% hidden
        set_image(new_image: Image) {
            this.image = new_image;
        }

        /**
         * Get the image of the item.
         * @return: The image.
         */
        //% block="item %Inventory(Item) get image"
        //% weight=30
        //% group="Item"
        //% hidden
        get_image() {
            return this.image;
        }
    }

    /**
     * Create a new item - for blocks. Only rewrapped for blocks.
     * @return: A new Inventory.Item. 
     */
    //% block="create item with name %name and %image || with quantity %quantity of value %value and cooldown %cooldown"
    //% blockSetVariable=item
    //% name.dfl="Name"
    //% image.shadow=screen_image_picker
    //% expandableArgumentMode="toggle"
    //% description.dfl="Description"
    //% weight=50
    //% group="Item"
    //% inlineInputMode=inline
    //% hidden
    export function create_item(name: string, image: Image, quantity: number = 1, value: number = 1, cooldown: number = 1) {
        return new Item(name, image, quantity, value, cooldown);
    }

    /**
     * Create a toolbar sprite which is just a regular sprite.
     */
    export class Toolbar extends Sprite {
        /**
         * Define (extra) variables that are part of the class.
         */
        private _items: Item[];
        private _selected: number = 0;
        private _max_items: number;
        private _box_outline_color: number = 12;
        private _box_selected_outline_color: number = 5;
        private _box_background_color: number = 13;
        private _box_text_color: number = 12;

        /**
         * Make a toolbar.
         */
        constructor(items: Item[] = [], max_items: number) {
            super(img`
                .
            `)
            this._items = items;
            this._max_items = max_items;
            this.update();
        }

        /**
         * Get the selected item index.
         */
        public get selected() {
            return this._selected;
        }

        /**
         * Set the selected item.
         */
        public set selected(index: number) {
            this._selected = index;
            this.update();
        }

        /**
         * Get the item selected by the modal in the toolbar.
         * @return: The currently selected item.
         */
        //% block="toolbar %Inventory(toolbar) get selected item"
        //% weight=84
        //% group="Toolbar"
        //% hidden
        public get_selected_item() {
            return this.items[this.selected];
        }

        /**
         * Gets an item in the toolbar by its name property.
         */
        private get_item_by_name(item_name: string) {
            return this._items.find(x => x.name == item_name);
        }

        /**
         * Cycle the selected toolbar item.
         */
        //% block="toolbar %Inventory(toolbar) cycle selected item"
        //% weight=35
        //% group="Toolbar"
        public cycle_selection(positions: number = 1) {
            this._selected += positions;
            if (this._selected > this._max_items - 1) {
                this._selected = 0;
            }
            this.update();
        }

        /**
         * Get the items in the toolbar.
         */
        public get items() {
            return this._items;
        }

        /**
         * Get the items in the toolbar. Only rewrapped for blocks.
         * @return: The items, as an array of Item.
         */
        //% block="toolbar %Inventory(toolbar) get items"
        //% weight=80
        //% group="Toolbar"
        //% hidden
        public get_items() {
            return this.items;
        }

        /**
         * Set the items in the toolbar.
         */
        public set items(new_items: Item[]) {
            this._items = new_items;
            this.update();
        }

        /**
         * Set the items in the toolbar. Only rewrapped for blocks.
         */
        //% block="toolbar %Inventory(toolbar) set items to %new_items"
        //% new_items.shadow="lists_create_with"
        //% weight=90
        //% group="Toolbar"
        //% hidden
        public set_items(new_items: Item[]) {
            this.items = new_items;
        }

        /**
         * Get the maximum amount of items in the toolbar.
         */
        public get max_items() {
            return this._max_items;
        }

        /**
         * Set the maximum amount of items in the toolbar.
         */
        public set max_items(new_max: number) {
            this._max_items = new_max;
            this.update();
        }

        /**
         * Set the selected index or max items. Only rewrapped for blocks.
         * @attribute: A property of the ToolbarNumberAttribute enum.
         * @value: The new value.
         */
        //% block="toolbar %Inventory(toolbar) set %attribute to %value"
        //% weight=70
        //% group="Toolbar"
        //% hidden
        public set_number(attribute: ToolbarNumberAttribute, value: number) {
            if (attribute == ToolbarNumberAttribute.SelectedIndex) {
                this.selected = value;
            } else if (attribute == ToolbarNumberAttribute.MaxItems) {
                this.max_items = value;
            }
        }

        /**
         * Change the selected index or max items. Only rewrapped for blocks.
         * @attribute: A property of the ToolbarNumberAttribute enum.
         * @change: The value to change the number by.
         */
        //% block="toolbar %Inventory(toolbar) change %attribute by %change"
        //% weight=65
        //% group="Toolbar"
        //% hidden
        public change_number(attribute: ToolbarNumberAttribute, change: number) {
            this.set_number(attribute, this.get_number(attribute) + change);
        }

        /**
         * Get the selected index or max items. Only rewrapped for blocks.
         * @attribute: A property of the ToolbarNumberAttribute enum.
         * @return: A number. 
         */
        //% block="toolbar %Inventory(toolbar) get %attribute"
        //% weight=60
        //% group="Toolbar"
        //% hidden
        public get_number(attribute: ToolbarNumberAttribute) {
            if (attribute == ToolbarNumberAttribute.SelectedIndex) {
                return this.selected;
            } else if (attribute == ToolbarNumberAttribute.MaxItems) {
                return this.max_items;
            }
            return -1;
        }

        /**
         * Get an item from the toolbar by its name.
         * @param name: The name of the item to retrieve.
         * @return: The matching Item object, or null if not found.
         */
        //% block="toolbar %Inventory(toolbar) get item called %name"
        //% weight=60
        //% group="Toolbar"
        //% hidden
        public get_item(name: string): Item {
            for (let i = 0; i < this._items.length; i++) {
                if (this._items[i].name == name) {
                    return this._items[i];
                }
            }
            return null;
        }

        /**
         * Set a specific part of the toolbar to a specific color.
         * @param attribute: A property of the ToolbarColorAttribute enum.
         * @param color: A number which should be the new color of the attribute.
         */
        //% block="toolbar %Inventory(toolbar) set color of %attribute to %color"
        //% color.shadow=colorindexpicker
        //% weight=50
        //% group="Toolbar"
        public set_color(attribute: ToolbarColorAttribute, color: number) {
            if (attribute == ToolbarColorAttribute.BoxOutline) {
                this._box_outline_color = color;
            } else if (attribute == ToolbarColorAttribute.BoxSelectedOutline) {
                this._box_selected_outline_color = color;
            } else if (attribute == ToolbarColorAttribute.BoxBackground) {
                this._box_background_color = color;
            } else if (attribute == ToolbarColorAttribute.BoxText) {
                this._box_text_color = color;
            }
            this.update();
        }

        /**
         * Get the color of a specific part of the toolbar.
         * @param attribute: A property of the ToolbarColorAttribute enum.
         * @return: The color (which is a number) of the attribute, otherwise -1. 
         */
        //% block="toolbar %Inventory(toolbar) get color of %attribute"
        //% weight=40
        //% group="Toolbar"
        public get_color(attribute: ToolbarColorAttribute) {
            if (attribute == ToolbarColorAttribute.BoxOutline) {
                return this._box_outline_color;
            } else if (attribute == ToolbarColorAttribute.BoxSelectedOutline) {
                return this._box_selected_outline_color;
            } else if (attribute == ToolbarColorAttribute.BoxBackground) {
                return this._box_background_color;
            } else if (attribute == ToolbarColorAttribute.BoxText) {
                return this._box_text_color;
            }
            return -1;
        }

        /**
         * set the quantity of a chosen item in the toolbar.
         * @param item_name: The name of the item that we want to set the quantity of.
         * @param value: What we would like to set the quantity of the item to.
         */
        //% block="toolbar %Inventory(toolbar) set quantity of %item_name to %value || delete if none left %deleteIfNoneLeft"
        //% expandableArgumentMode="toggle"
        //% weight=35
        //% group="Toolbar"
        public set_item_quantity(item_name: string, value: number, deleteIfNoneLeft: boolean = false): void {
            let selected_item = this.get_item_by_name(item_name);
            if (selected_item) {
                selected_item.quantity = value;
                if (selected_item.quantity <= 0) {
                    selected_item.quantity = 0;
                    if (deleteIfNoneLeft) {
                        this._items = this._items.filter(item => item.name !== item_name);
                    }
                }
                this.update();
            }
        }


        /**
         * change the quantity of a chosen item in the toolbar.
         * @param item_name: The name of the item that we want to change the quantity of.
         * @param value: How much we want to change the quantity of the item by.
         */
        //% block="toolbar %Inventory(toolbar) change quantity of %item_name by %value || delete if none left %deleteIfNoneLeft"
        //% expandableArgumentMode="toggle"
        //% weight=35
        //% group="Toolbar"
        public change_item_quantity(item_name: string, value: number, deleteIfNoneLeft: boolean = false): void {
            let selected_item = this.get_item_by_name(item_name)
            if (selected_item) {
                selected_item.quantity += value;
                if (selected_item.quantity <= 0) {
                    selected_item.quantity = 0;
                    if (deleteIfNoneLeft) {
                        this._items = this._items.filter(item => item.name !== item_name);
                    }
                }
                this.update();
            }
        }

        //% block="toolbar %Inventory(toolbar) add item $item || with quantity $quantityToAdd"
        //% expandableArgumentMode="toggle"
        //% group="Toolbar"
        //% weight=40
        public add_item(item: Inventory.Item, quantityToAdd: number = 1): void {
            let existingItem = this._items.find(x => x.name === item.name);
            if (existingItem) {
                existingItem.quantity += quantityToAdd;
            } else {
                let newItem = new Item(item.name, item.image, quantityToAdd, item.value);
                this._items.push(newItem);
            }
            this.update();
        }


        /**
         * Update the image of the toolbar.
         */
        //% block="toolbar %Inventory(toolbar) force redraw"
        //% weight=30
        public update() {
            let image_size: number = 16;
            let padding: number = 2;
            let box_size: number = image_size + (padding * 2);
            let new_image = image.create(
                ((box_size + 2) * this.max_items) - padding,
                box_size
            )
            for (let index = 0; index < this.max_items; index++) {
                if (index > this.max_items - 1) {
                    return;
                }
                new_image.fillRect(
                    (box_size + padding) * index,
                    0,
                    box_size,
                    box_size,
                    this._box_background_color
                )
                let x: number = ((box_size + padding) * index) + 2;
                let y: number = 2;
                if (index < this.items.length) {
                    spriteutils.drawTransparentImage(this.items[index].image, new_image, x, y)
                }
                new_image.drawRect(
                    (box_size + padding) * index,
                    0,
                    box_size,
                    box_size,
                    index == this.selected ? this._box_selected_outline_color : this._box_outline_color
                )
                if (index < this.items.length) {
                    this.print_right_aligned(new_image, (this.items[index].quantity).toString(),
                        x + box_size - 3, y + (box_size - 5) - 4, this._box_text_color,
                        true);
                }
            }
            this.setImage(new_image);
        }

        /**
         * Print some text right-aligned
         * @param target: The image to draw too.
         * @param text: The text to draw.
         * @param right: the X coordinate of the right of the text.
         * @param y: The Y coordinate of the text.
         * @param color: The color of the text.
         * @param use_small_font: Whether to use the 5x5 instead of the 5x8 font.
         */
        private print_right_aligned(target: Image, text: string,
            right: number, y: number,
            color: number, use_small_font: boolean = false) {
            let text_length_px: number = text.length * 6;
            let label_x: number = right - text_length_px;
            target.print(text, label_x, y, color, use_small_font ? image.font5 : image.font8);
        }
    }

    /**
     * Create a new toolbar - for blocks.
     * @return: A new Toolbar.
     */
    //% block="create toolbar with items %items and max items %max_items"
    //% blockSetVariable=toolbar
    //% items.shadow="lists_create_with"
    //% max_items.dfl=3
    //% weight=100
    //% group="Toolbar"
    //% hidden
    export function create_toolbar(items: Item[], max_items: number) {
        return new Toolbar(items, max_items);
    }

    /**
     * Create an inventory sprite which is just a regular sprite.
     */
    export class Inventory extends Sprite {
        /**
         * Define (extra) variables that are part of the class.
         */
        private _items: Item[];
        private _selected: number = 0;
        private _max_items: number;
        private _text: string = "Inventory";
        private _inv_outline_color: number = 12;
        private _inv_selected_outline_color: number = 5;
        private _inv_background_color: number = 13;
        private _inv_text_color: number = 12;

        /**
         * Make an inventory.
         */
        constructor(items: Item[] = [], max_items: number) {
            super(img`
                .
            `)
            this._items = items;
            this._max_items = max_items;
            this.update();
        }

        /**
         * Get the selected item.
         */
        public get selected() {
            return this._selected;
        }

        /**
         * Set the selected item.
         */
        public set selected(index: number) {
            this._selected = index;
            this.update();
        }

        /**
         * Get the items in the inventory.
         */
        public get items() {
            return this._items;
        }

        /**
         * Get the items in the inventory. Only rewrapped for blocks.
         * @return: The items - as an array of Item. 
         */
        //% block="inventory %Inventory(inventory) get items"
        //% weight=80
        //% group="Inventory"
        //% hidden
        public get_items() {
            return this.items;
        }

        /**
         * Set the items in the inventory.
         */
        public set items(new_items: Item[]) {
            this._items = new_items;
            this.update();
        }

        /**
         * Set the items in the inventory. Only rewrapped for blocks.
         * @new_items: A list of Item.
         */
        //% block="inventory %Inventory(inventory) set items to %new_items"
        //% new_items.shadow="lists_create_with"
        //% weight=90
        //% group="Inventory"
        //% hidden
        public set_items(new_items: Item[]) {
            this.items = new_items;
        }

        /**
         * Get the maximum amount of items in the inventory.
         */
        public get max_items() {
            return this._max_items;
        }

        /**
         * Set the maximum amount of items in the inventory.
         */
        public set max_items(new_max: number) {
            this._max_items = new_max;
            this.update();
        }

        /**
         * Set the selected index or max items. Only rewrapped for blocks.
         * @attribute: A property of the InventoryNumberAttribute enum.
         * @value: The new number.
         */
        //% block="inventory %Inventory(inventory) set %attribute to %value"
        //% weight=70
        //% group="Inventory"
        //% hidden
        public set_number(attribute: InventoryNumberAttribute, value: number) {
            if (attribute == InventoryNumberAttribute.SelectedIndex) {
                this.selected = value;
            } else if (attribute == InventoryNumberAttribute.MaxItems) {
                this.max_items = value;
            }
        }

        /**
         * Change the selected index or max items. Only rewrapped for blocks.
         * @attribute: A property of the InventoryNumberAttribute enum.
         * @change: The value to change the number by.
         */
        //% block="inventory %Inventory(inventory) change %attribute by %change"
        //% weight=65
        //% group="Inventory"
        //% hidden
        public change_number(attribute: InventoryNumberAttribute, change: number) {
            this.set_number(attribute, this.get_number(attribute) + change);
        }

        /**
         * Get the selected index or max items. Only rewrapped for blocks.
         * @attribute: A property of the InventoryNumberAttribute enum.
         * @return: The number. 
         */
        //% block="inventory %Inventory(inventory) get %attribute"
        //% weight=60
        //% group="Inventory"
        //% hidden
        public get_number(attribute: InventoryNumberAttribute) {
            if (attribute == InventoryNumberAttribute.SelectedIndex) {
                return this.selected;
            } else if (attribute == InventoryNumberAttribute.MaxItems) {
                return this.max_items;
            }
            return -1;
        }

        /**
         * Get the text in the inventory.
         */
        public get text() {
            return this._text;
        }

        /**
         * Get the text in the inventory. Only rewrapped for blocks.
         * @return: A string. 
         */
        //% block="inventory %Inventory(inventory) get text"
        //% weight=40
        //% group="Inventory"
        //% hidden
        public get_text() {
            return this.text;
        }

        /**
         * Set the text in the inventory.
         */
        public set text(new_text: string) {
            this._text = new_text;
            this.update();
        }

        /**
         * Set the text in the inventory. Only rewrapped for blocks.
         * @new_text: The new text. 
         */
        //% block="inventory %Inventory(inventory) set text to %new_text"
        //% weight=50
        //% group="Inventory"
        //% hidden
        public set_text(new_text: string) {
            this.text = new_text;
        }

        /**
         * Set a specific part of the inventory to a specific color.
         * @param attribute: A property of the InventoryColorAttribute enum.
         * @param color: A number which should be the new color of the attribute.
         */
        //% block="inventory %Inventory(inventory) set color of %attribute to %color"
        //% color.shadow=colorindexpicker
        //% weight=30
        //% group="Inventory"
        public set_color(attribute: InventoryColorAttribute, color: number) {
            if (attribute == InventoryColorAttribute.InventoryOutline) {
                this._inv_outline_color = color;
            } else if (attribute == InventoryColorAttribute.InventorySelectedOutline) {
                this._inv_selected_outline_color = color;
            } else if (attribute == InventoryColorAttribute.InventoryBackground) {
                this._inv_background_color = color;
            } else if (attribute == InventoryColorAttribute.InventoryText) {
                this._inv_text_color = color;
            }
            this.update();
        }

        /**
         * Get the color of a specific part of the inventory.
         * @param attribute: A property of the InventoryColorAttribute enum.
         * @return: The color (which is a number) of the attribute, otherwise -1. 
         */
        //% block="inventory %Inventory(inventory) get color of %attribute"
        //% weight=20
        //% group="Inventory"
        public get_color(attribute: InventoryColorAttribute) {
            if (attribute == InventoryColorAttribute.InventoryOutline) {
                return this._inv_outline_color;
            } else if (attribute == InventoryColorAttribute.InventorySelectedOutline) {
                return this._inv_selected_outline_color;
            } else if (attribute == InventoryColorAttribute.InventoryBackground) {
                return this._inv_background_color;
            } else if (attribute == InventoryColorAttribute.InventoryText) {
                return this._inv_text_color;
            }
            return -1;
        }

        /**
         * Update the image of the inventory.
         */
        //% block="inventory %Inventory(Inventory) force redraw"
        //% weight=10
        //% group="Inventory"
        public update() {
            let image_size2: number = 16;
            let padding2: number = 1;
            let box_size2: number = image_size2 + (padding2 * 2);
            let outside_padding: number = 4;
            let width: number = scene.screenWidth() - (outside_padding * 2);
            let height: number = scene.screenHeight() - (outside_padding * 2) - 24;
            let new_image2 = image.create(width, height);
            new_image2.fill(this._inv_background_color);
            new_image2.drawRect(0, 0, width, height, this._inv_outline_color);
            new_image2.print(this.text, 2, 2, this._inv_text_color);
            if (this.selected < this.items.length && this.selected != -1) {
                let text: string = this.items[this.selected].name;
                this.print_right_aligned(new_image2, text, width - 2, 2, this._inv_text_color, false);
            }
            new_image2.drawLine(2, 11, width - 3, 11, this._inv_outline_color);
            for (let index2 = 0; index2 < this.max_items; index2++) {
                if (index2 > this.max_items - 1) {
                    return;
                }
                let x2: number = ((index2 % 8) * box_size2) + 4;
                let y2: number = (Math.idiv(index2, 8) * box_size2) + 14;
                if (index2 < this.items.length) {
                    if (index2 == this.selected) {
                        new_image2.fillRect(x2 - 1, y2 - 1, box_size2, box_size2,
                            this._inv_selected_outline_color);
                    }
                    spriteutils.drawTransparentImage(this.items[index2].image, new_image2, x2, y2);
                    this.print_right_aligned(new_image2, this.items[index2].tooltip,
                        x2 + box_size2, y2 + (box_size2 - 5) - 1, this._inv_text_color,
                        true);
                }
            }
            this.setImage(new_image2);
        }

        /**
         * Print some text right-aligned
         * @param target: The image to draw too.
         * @param text: The text to draw.
         * @param right: the X coordinate of the right of the text.
         * @param y: The Y coordinate of the text.
         * @param color: The color of the text.
         * @param use_small_font: Whether to use the 5x5 instead of the 5x8 font.
         */
        private print_right_aligned(target: Image, text: string,
            right: number, y: number,
            color: number, use_small_font: boolean = false) {
            let text_length_px2: number = text.length * 6;
            let label_x2: number = right - text_length_px2;
            target.print(text, label_x2, y, color, use_small_font ? image.font5 : image.font8);
        }
    }

    /**
     * Create a new inventory - for blocks.
     */
    //% block="create inventory with items %items and max items %max_items"
    //% blockSetVariable=inventory
    //% items.shadow="lists_create_with"
    //% max_items.dfl=3
    //% weight=100
    //% group="Inventory"
    //% hidden
    export function create_inventory(items: Item[], max_items: number) {
        return new Inventory(items, max_items);
    }
}
