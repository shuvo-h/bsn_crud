"use client";
import BsnModal from "@/components/Weidge/modal/BsnModal";
import BsnDropdown, { TBsnDropdownItem } from "@/components/ui/BsnDropdown";
import Button from "@/components/ui/Button";
import Error from "@/components/ui/Error";
import BsnFileUploader from "@/components/ui/Form/BsnFileUploader";
import BsnForm from "@/components/ui/Form/BsnForm";
import BsnInput from "@/components/ui/Form/BsnInput";
import useApi from "@/hooksAndCtx/useApi";
import { TAddBsnPayload, TBsnUser } from "@/interface/bsnUser.interface";
import { TBSN_USER_STATUS } from "@/interface/enums";
import { BsnUserApi } from "@/network/BsnUserApi";
import React, { Dispatch, SetStateAction, useState } from "react";

const bsnUserStatusList = [
  // { label: 'Earnings', value: 'earnings' },
  ...Object.keys(TBSN_USER_STATUS)
    .filter((key) => isNaN(Number(key)))
    .map((key) => ({
      label: key,
      value: TBSN_USER_STATUS[key as keyof typeof TBSN_USER_STATUS],
    })),
];

type TImportBsnUserModalProps = {
  setBsnUsers: Dispatch<SetStateAction<TBsnUser[] | null>>;
};

const ImportBsnUserModal = ({ setBsnUsers }: TImportBsnUserModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [csvData, setCsvData] = useState<TAddBsnPayload[]>([]);
  const [error, setError] = useState<string | null>(null);
  const {
    data,
    errorMessage,
    execute,
    isLoading,
    isSuccess,
    successMessage,
    errors,
  } = useApi<TBsnUser[]>();



  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setCsvData([])
    setError(null)
    setIsModalOpen(false);
  };

  const handleAddBsnUser = async () => {

    // filter and format data
    const isValid = csvData.every(el=>el.code && el.status);
    if (!isValid) {
      setError("Invalid data. Each should have valid code and status");
      return
    }
    const formattedCsvData = csvData.map(el=>({...el,status:Number(el.status)}))



    // call API and get error
    const result = await execute(() => BsnUserApi.addBulkBsnUser(formattedCsvData));

    if (Array.isArray(result.data) && result.isSuccess) {
      setBsnUsers((pre) => {
        if (Array.isArray(pre) && Array.isArray(result.data)) {
          const newList = [...result.data as TBsnUser[], ...pre];
          return newList;
        }
        return pre;
      });
      closeModal();
    }

    // update table with new data
  };

  const handleFileUpload = (file: File | null, name?: string) => {

    if (!file || file.type !== "text/csv") {
      setError("Only CSV files are allowed.");
      return;
    }

    setError(null);
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target) {
        const text = event.target.result as string;
        const lines = text.split("\n");
        const headers = lines[0].split(",").map((header) => header.trim());
        const csvData = [];

        for (let i = 1; i < lines.length; i++) {
          const columns = lines[i].split(",");
          if (columns.length === headers.length) {
            const obj: Record<string, any> = {};
            columns.forEach((column, index) => {
              obj[headers[index]] = column.trim();
            });
            csvData.push(obj);
          }
        }

        setCsvData(csvData as TAddBsnPayload[]);
      }
    };
    reader.onerror = () => {
      setError("Error reading the file.");
    };
    reader.readAsText(file);
  };

  return (
    <div>
      <button
        onClick={openModal}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Bulk CSV import
      </button>
      <BsnModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Add a new user"
        description="input details of the user to be added in the list"
      >
        <div>
          <BsnForm>
            <BsnFileUploader
              label="Upload CSV File"
              name="csvFile"
              accept=".csv"
              onChange={handleFileUpload}
              errorMessage={error}
            />
          </BsnForm>
          <Error message={errorMessage} />
          <Button
            loading={isLoading}
            disabled={isLoading}
            onClick={handleAddBsnUser}
            type="button"
          >
            Add User
          </Button>
        </div>
      </BsnModal>
    </div>
  );
};

export default ImportBsnUserModal;
