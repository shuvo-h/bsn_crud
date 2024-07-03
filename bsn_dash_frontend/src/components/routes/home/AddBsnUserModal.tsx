'use client'
import BsnModal from '@/components/Weidge/modal/BsnModal';
import BsnDropdown, { TBsnDropdownItem } from '@/components/ui/BsnDropdown';
import Button from '@/components/ui/Button';
import Error from '@/components/ui/Error';
import BsnForm from '@/components/ui/Form/BsnForm';
import BsnInput from '@/components/ui/Form/BsnInput';
import { BSN_USER_STATUS_LIST } from '@/constant/bsnUser.constant';
import useApi from '@/hooksAndCtx/useApi';
import { TAddBsnPayload, TBsnUser } from '@/interface/bsnUser.interface';
import { TBSN_USER_STATUS } from '@/interface/enums';
import { BsnUserApi } from '@/network/BsnUserApi';
import React, { Dispatch, SetStateAction, useState } from 'react';




  type TAddBsnUserModalProps = {
    setBsnUsers:  Dispatch<SetStateAction<TBsnUser[] | null>>
}

const AddBsnUserModal = ({setBsnUsers}:TAddBsnUserModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {data,errorMessage,execute,isLoading,isSuccess,successMessage,errors} = useApi<TBsnUser>();
  const [newUser, setNewUser] = useState<TAddBsnPayload>({} as TAddBsnPayload);


  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleAddBsnUser = async() => {
    // call API and get error
    const result = await execute(()=>BsnUserApi.addSingleBsnUser(newUser));
    if (result.data?.id) {
      setBsnUsers((pre)=>{
        if (Array.isArray(pre)) {
          const newList = [result.data as TBsnUser,...pre,];
          return newList;
        }
        return pre;
      })
      closeModal();
    }
    // update table with new data
  };
  const handleItemClick = (item:TBsnDropdownItem) => {
    setNewUser({...newUser,status: item.value as TBSN_USER_STATUS})
  };

  return (
    <div>
      <button onClick={openModal} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Add
      </button>
      <BsnModal isOpen={isModalOpen} onClose={closeModal} title='Add a new user' description='input details of the user to be added in the list'>
        <div>
          <BsnForm>
            <BsnInput
                label='Code:'
                name='code'
                errorMessage={errors?.code}
                setState={setNewUser}
                type='text'
                placeholder='Type the code of the user'
            />
            <BsnDropdown
                 items={BSN_USER_STATUS_LIST}
                 onClick={handleItemClick}
                 disabled={false}
                 placeholder='Select the status'
                 className='mb-6'
                 label='Status of the user:'
                 errorMessage={errors?.status}
                //  defaultValue={bsnUserStatusList[2].value}
            />
            <BsnInput
                label='Name:'
                name='name'
                errorMessage={errors?.name}
                setState={setNewUser}
                type='text'
                placeholder='Type the user name'
            />
            <BsnInput
                label='IC:'
                name='ic'
                errorMessage={errors?.ic}
                setState={setNewUser}
                type='text'
                placeholder="Type the user's ic"
            />
            <BsnInput
                label='Phone Number:'
                name='phone_number'
                errorMessage={errors?.phone_number}
                setState={setNewUser}
                type='text'
                placeholder='Type the user name'
            />
            <BsnInput
                label='Company Name:'
                name='company_name'
                errorMessage={errors?.company_name}
                setState={setNewUser}
                type='text'
                placeholder='Type the user name'
            />
          </BsnForm>
          <Error message={errorMessage} />
          <Button
            loading={isLoading}
            disabled={isLoading}
            onClick={handleAddBsnUser}
            type='button'
            >Add User</Button>
        </div>
      </BsnModal>
    </div>
  );
};

export default AddBsnUserModal;
