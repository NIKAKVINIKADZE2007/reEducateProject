import { useState } from 'react';

type ItemType = {
  name: string;
  quantity: string;
  price: string;
  total: string;
};

export default function PopUp() {
  const [items, setItems] = useState<ItemType[]>([]);
  const [showNewItem, setShowNewItem] = useState<boolean>(false);
  const [newItem, setNewItem] = useState<ItemType>({
    name: '',
    quantity: '',
    price: '',
    total: '0',
  });

  const handleButtonClick = () => {
    if (showNewItem) {
      const updatedItem = {
        ...newItem,
        total: (+newItem.quantity * +newItem.price).toString(),
      };
      setItems((prevItems) => [...prevItems, updatedItem]);
      setNewItem({ name: '', quantity: '', price: '', total: '0' });
    }
    setShowNewItem(!showNewItem);
  };

  return (
    <>
      <h3 className='text-[#777F98] mt-[70px] mb-[15px] tablet:mb-[14px]'>
        Item List
      </h3>
      {showNewItem && (
        <div className='flex flex-col tablet:flex-row mb-[48px]'>
          <div className='w-full'>
            <label className='text-blueGray text-[13px]'>Item Name</label>
            <input
              className='input'
              type='text'
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            />
          </div>
          <div className='flex w-full justify-between mt-[25px] tablet:mt-0 tablet:ml-4'>
            <div className='flex gap-4 w-full'>
              <div>
                <label className='text-blueGray text-[13px]'>Qty.</label>
                <input
                  className='input'
                  type='number'
                  value={newItem.quantity}
                  onChange={(e) =>
                    setNewItem({ ...newItem, quantity: e.target.value })
                  }
                />
              </div>

              <div>
                <label className='text-blueGray text-[13px]'>Price</label>
                <input
                  className='input'
                  type='number'
                  value={newItem.price}
                  onChange={(e) =>
                    setNewItem({ ...newItem, price: e.target.value })
                  }
                />
              </div>
              <div className='flex flex-col items-center'>
                <p className='text-blueGray text-[13px]'>Total</p>
                <p className='mt-[27px] text-darkGray'>
                  {(+newItem.quantity * +newItem.price).toString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className='flex flex-col w-full'>
        {items.length > 0 &&
          items.map((item, index) => (
            <div
              key={index}
              className='flex flex-col tablet:flex-row mb-[48px]'
            >
              <div className='w-full'>
                <label className='text-blueGray text-[13px]'>Item Name</label>
                <input
                  className='input'
                  type='text'
                  value={item.name}
                  readOnly
                />
              </div>
              <div className='flex w-full justify-between'>
                <div className='flex gap-4 w-full'>
                  <div className='tablet:ml-4'>
                    <label className='text-blueGray text-[13px]'>Qty.</label>
                    <input
                      className='input'
                      type='number'
                      value={item.quantity}
                      readOnly
                    />
                  </div>

                  <div>
                    <label className='text-blueGray text-[13px]'>Price</label>
                    <input
                      className='input'
                      type='number'
                      value={item.price}
                      readOnly
                    />
                  </div>
                  <div className='flex flex-col items-center'>
                    <p className='text-blueGray text-[13px]'>Total</p>
                    <p className='mt-[27px] text-darkGray'>{item.total}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}

        <button
          type='button'
          onClick={handleButtonClick}
          className='w-full bg-[#DFE3FA] h-[48px] rounded-3xl text-blueGray'
        >
          {showNewItem ? 'Add Item' : '+ Add New Item'}
        </button>
      </div>
    </>
  );
}
