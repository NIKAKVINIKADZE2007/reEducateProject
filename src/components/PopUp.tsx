import { useEffect, useState } from 'react';
import { Invoice } from '../../invoices/InvoiceJson';
import { FieldErrors } from 'react-hook-form';

type ItemType = {
  itemName: string;
  quantity: number;
  price: number;
};

export default function PopUp({
  register,
  invoice,
  isLight,
  setValue,
  errors,
}: {
  isLight: boolean;
  errors: FieldErrors<Invoice>;
  register: any;
  invoice?: Invoice;
  setValue: any;
}) {
  const [items, setItems] = useState<ItemType[]>([]);
  const [showNewItem, setShowNewItem] = useState<boolean>(false);
  const [newItem, setNewItem] = useState({
    itemName: '',
    quantity: 0,
    price: 0,
  });

  useEffect(() => {
    if (invoice) {
      setItems(invoice.items);
    }
  }, [invoice]);

  const handleButtonClick = async () => {
    if (showNewItem) {
      const updatedItem: ItemType = {
        itemName: newItem.itemName,
        quantity: newItem.quantity,
        price: newItem.price,
      };

      await setItems((prevItems) => {
        const newItems = [...prevItems, updatedItem];
        setValue('items', newItems);
        return newItems;
      });

      console.log(items);

      setNewItem({ itemName: '', quantity: 0, price: 0 });
      setShowNewItem(false);
    } else {
      setShowNewItem(true);
    }
  };

  return (
    <>
      <h3 className='text-[#777F98] mt-[70px] mb-[15px] tablet:mb-[14px]'>
        Item List
      </h3>

      {items.length == 0 && (
        <p className='text-red-500'>items must not be empty</p>
      )}
      {showNewItem && (
        <div className='flex flex-col tablet:flex-row mb-[48px]'>
          <div className='w-full'>
            <label className='text-blueGray text-[13px]'>Item Name</label>
            <input
              className={`input ${
                isLight ? 'bg-white text-[#0C0E16]' : 'bg-[#252945] text-white'
              }`}
              type='text'
              value={newItem.itemName}
              onChange={(e) =>
                setNewItem({ ...newItem, itemName: e.target.value })
              }
            />
            {errors.items?.[0]?.itemName && (
              <p className='text-red-500'>
                {errors.items[0].itemName?.message}
              </p>
            )}
          </div>
          <div className='flex w-full justify-between mt-[25px] tablet:mt-0 tablet:ml-4'>
            <div className='flex gap-4 w-full'>
              <div>
                <label className='text-blueGray text-[13px]'>Qty.</label>
                <input
                  className={`input ${
                    isLight
                      ? 'bg-white text-[#0C0E16]'
                      : 'bg-[#252945] text-white'
                  }`}
                  type='number'
                  value={newItem.quantity || ''}
                  onChange={(e) =>
                    setNewItem({ ...newItem, quantity: +e.target.value || 0 })
                  }
                />

                {errors.items?.[0]?.quantity && (
                  <p className='text-red-500'>
                    {errors.items[0].quantity?.message}
                  </p>
                )}
              </div>

              <div>
                <label className='text-blueGray text-[13px]'>Price</label>
                <input
                  className={`input ${
                    isLight
                      ? 'bg-white text-[#0C0E16]'
                      : 'bg-[#252945] text-white'
                  }`}
                  type='number'
                  value={newItem.price || ''}
                  onChange={(e) =>
                    setNewItem({ ...newItem, price: +e.target.value || 0 })
                  }
                />

                {errors.items?.[0]?.price && (
                  <p className='text-red-500'>
                    {errors.items[0].price?.message}
                  </p>
                )}
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
                  className={`input ${
                    isLight
                      ? 'bg-white text-[#0C0E16]'
                      : 'bg-[#252945] text-white'
                  }`}
                  type='text'
                  value={item.itemName}
                  {...register(`items.${index}.itemName`)}
                  onChange={(e) =>
                    setItems((prevItems) =>
                      prevItems.map((itm, i) =>
                        i === index ? { ...itm, itemName: e.target.value } : itm
                      )
                    )
                  }
                />
              </div>
              <div className='flex w-full justify-between'>
                <div className='flex gap-4 w-full'>
                  <div className='tablet:ml-4'>
                    <label className='text-blueGray text-[13px]'>Qty.</label>
                    <input
                      className={`input ${
                        isLight
                          ? 'bg-white text-[#0C0E16]'
                          : 'bg-[#252945] text-white'
                      }`}
                      type='number'
                      value={item.quantity || ''}
                      {...register(`items.${index}.quantity`)}
                      onChange={(e) =>
                        setItems((prevItems) =>
                          prevItems.map((itm, i) =>
                            i === index
                              ? { ...itm, quantity: +e.target.value || 0 }
                              : itm
                          )
                        )
                      }
                    />
                  </div>

                  <div>
                    <label className='text-blueGray text-[13px]'>Price</label>
                    <input
                      className={`input ${
                        isLight
                          ? 'bg-white text-[#0C0E16]'
                          : 'bg-[#252945] text-white'
                      }`}
                      type='number'
                      value={item.price || ''}
                      {...register(`items.${index}.price`)}
                      onChange={(e) =>
                        setItems((prevItems) =>
                          prevItems.map((itm, i) =>
                            i === index
                              ? { ...itm, price: +e.target.value || 0 }
                              : itm
                          )
                        )
                      }
                    />
                  </div>

                  <div className='flex flex-col items-center'>
                    <p className='text-blueGray text-[13px]'>Total</p>
                    <p className='mt-[27px] text-darkGray'>
                      {(+item.quantity * +item.price).toString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}

        <button
          type='button'
          disabled={
            (!newItem.itemName.trim() || !newItem.quantity || !newItem.price) &&
            showNewItem
          }
          onClick={handleButtonClick}
          className={`w-full ${
            isLight ? 'bg-white' : 'bg-[#252945]'
          }  h-[48px] rounded-3xl text-blueGray`}
        >
          {showNewItem ? 'Add Item' : '+ Add New Item'}
        </button>
      </div>
    </>
  );
}
