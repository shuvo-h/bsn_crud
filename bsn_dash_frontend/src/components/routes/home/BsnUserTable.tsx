"use client";

import Pagination from "@/components/Weidge/Pagination";
import Table, { Column } from "@/components/Weidge/Table";
import useApi from "@/hooksAndCtx/useApi";
import { TMeta } from "@/interface";
import { TBsnUser } from "@/interface/bsnUser.interface";
import { TBSN_USER_STATUS } from "@/interface/enums";
import { BsnUserApi } from "@/network/BsnUserApi";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";

type TBsnUserTableProps = {
  columns: Column<any>[],
  data: TBsnUser[],
  currentPage: number,
  meta: TMeta,
  onPageChange: (page:number)=>void
}

const BsnUserTable = ({columns,currentPage,data,meta,onPageChange}:TBsnUserTableProps) => {








  return (
    <div>
      <Table columns={columns} data={data || []} />
      <Pagination currentPage={currentPage} perPage={meta?.limit || 0} total={meta?.total || 0} onPageChange={onPageChange} />
    </div>
  );
};

export default BsnUserTable;
