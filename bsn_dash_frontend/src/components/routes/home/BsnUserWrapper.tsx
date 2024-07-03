'use client'
import { useEffect, useState } from 'react';
import BsnUserTable from './BsnUserTable';
import HomeHeading from './HomeHeading';
import useApi from '@/hooksAndCtx/useApi';
import { TBsnUser } from '@/interface/bsnUser.interface';
import { BsnUserApi } from '@/network/BsnUserApi';
import { TrashIcon } from '@heroicons/react/16/solid';
import { Column } from '@/components/Weidge/Table';
import { defaultMeta } from '@/constant/pagination.constant';
import Button from '@/components/ui/Button';
import BsnDropdown, { TBsnDropdownItem } from '@/components/ui/BsnDropdown';
import { BSN_USER_STATUS_LIST } from '@/constant/bsnUser.constant';
import { TBSN_USER_STATUS } from '@/interface/enums';

const BsnUserWrapper = () => {
    const { data, isLoading, execute, meta,setData:setBsnUsers } = useApi<TBsnUser[]>([]);
    const { isLoading:isDeleting, execute:executeDelete, isSuccess:isDelSuccess } = useApi<TBsnUser>({});
    const { execute:executeStatusUpdate, isSuccess:isUpdateSuccess  } = useApi<TBsnUser>({});
    const [deleteCode,setDeleteCode] = useState<string>('')
  const [currentPage,setCurrentPage] = useState(1)

  useEffect(() => {
    execute(() => BsnUserApi.getAllBsnUsers({limit:10,page:currentPage}));
  }, [currentPage]);

  const onPageChange = (page:number) =>{
    setCurrentPage(page)
  }
  const deleteBsnUser = async(row:TBsnUser) =>{
    setDeleteCode(row.code)
    const result = await executeDelete(()=>BsnUserApi.deleteBsnUserByCode(row.code));
    console.log({isDelSuccess,result});
    setDeleteCode('')

    if (isDelSuccess) {
      setBsnUsers((pre)=>{
        if (Array.isArray(pre)) {
          const newList = pre.filter(el=>el.code !== row.code);
          return newList;
        }
        return pre;
      })
    }

  }

  const handleStatusUpdate = async(status:TBSN_USER_STATUS,row:TBsnUser) => {
    // call API to chage status

    const result = await executeStatusUpdate(()=>BsnUserApi.updateBsnUserByCode({code:row.code,status:status}));
    if (isUpdateSuccess) {
      setBsnUsers((pre)=>{
        if (Array.isArray(pre)) {
          // update the status only
          const newList = [...pre];
          const idx = newList.findIndex(el=>el.id === row.id);
          if(idx != -1){
            newList[idx].status = status;
          }
          return newList;
        }
        return pre;
      })

    }
  };



  // format data for table and pass
  const columns:Column<any>[] = [
    { header: "Id", accessor: "id", width: "150px", visible: true },
    {
      header: "Code",
      accessor: "code",
      sortable: false,
      width: "200px",
      visible: true,
    },
    {
      header: "Status", accessor: "status", visible: true,
      render: (value,row) =>(
        <BsnDropdown
                 items={BSN_USER_STATUS_LIST}
                 onClick={(seectedItem)=>handleStatusUpdate(Number(seectedItem.value),row)}
                 disabled={false}
                 placeholder='Select the status'
                 className='mb-6'
                 defaultValue={value}
                 variant='transparent'
            />
      )
    },
    { header: "Name", accessor: "name", width: "200px", sortable: false },
    { header: "IC", accessor: "ic", width: "100px", sortable: false },
    { header: "Phone Number", accessor: "phone_number", sortable: false },
    { header: "Company name", accessor: "company_name" },
    {
      header: "Actions",
      accessor: "actions",
      visible: true,
      width: '200px',
      render: (value, row) => (
        <Button onClick={()=>deleteBsnUser(row)} loading={row.code === deleteCode} variant='transparent' className='hover:bg-red-100'>
          <TrashIcon className="fill-red-500 cursor-pointer inline-block" width={20} />
        </Button>
      ),
    },
  ];

    return (
        <div>
            <HomeHeading setBsnUsers={setBsnUsers} />
            <BsnUserTable
                columns={columns}
                currentPage={currentPage}
                data={data || []}
                meta={meta || defaultMeta}
                onPageChange={onPageChange}
            />
        </div>
    );
};

export default BsnUserWrapper;