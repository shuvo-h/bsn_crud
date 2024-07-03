import Button from "@/components/ui/Button";
import AddBsnUserModal from "./AddBsnUserModal";
import { Dispatch, SetStateAction } from "react";
import { TBsnUser } from "@/interface/bsnUser.interface";
import ImportBsnUserModal from "./ImportBsnUserModal";

type THomeHeadingProps = {
    setBsnUsers:  Dispatch<SetStateAction<TBsnUser[] | null>>
}
const HomeHeading = ({setBsnUsers}:THomeHeadingProps) => {
    return (
        <div className="flex justify-between mt-4">
            <h2>Page Title</h2>
            <div className="flex gap-4">
                <AddBsnUserModal setBsnUsers={setBsnUsers} />
                <ImportBsnUserModal setBsnUsers={setBsnUsers} />
            </div>
        </div>
    );
};

export default HomeHeading;