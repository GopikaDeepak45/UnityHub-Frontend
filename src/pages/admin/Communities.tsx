import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  // TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { useFetchCommunityDataQuery } from "@/redux/apiSlices/adminApiSlice";
import CustomAlertButton from "@/components/CustomAlert";

const Communities = () => {
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);
  // Use the Redux Toolkit Query hook to fetch community data
  const { data = [], error, isLoading } = useFetchCommunityDataQuery(undefined);
  console.log('fetched data is', data.communityData);

  useEffect(() => {
    // When data is fetched successfully, update the state
    if (!isLoading && !error) {
      setCommunities(data.communityData);
      setLoading(false);
    }
  }, [data, isLoading, error]);
  if (error) {
    return <div className=" flex  justify-center text-4xl ">Something went wrong!...</div>;
  }
  if (loading) {
    return <div className=" flex  justify-center ">Loading...</div>;
  }

  return (
    <div className="ml-10">
      <h1 className="text-2xl font-semibold m-10">Communities</h1>
      <Table className="mt-11">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Sl NO:</TableHead>
            <TableHead>Community Name</TableHead>
            <TableHead>Area</TableHead>
            <TableHead>Admin Name</TableHead>
            <TableHead>Admin Email</TableHead>
            <TableHead>Mobile No</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {communities.map((elem: any, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{elem.communityId.name}</TableCell>
              <TableCell>{elem.communityId.location}</TableCell>
              <TableCell>{elem.userName}</TableCell>
              <TableCell>{elem.email}</TableCell>
              <TableCell>{elem.mobileNo}</TableCell>
              <TableCell className="text-right">
                {/* Button component and also an alert dialog in it */}
                <CustomAlertButton
                  title="Are you absolutely sure?"
                  description="This action cannot be undone. This will permanently delete the community."
                  cancelText="Cancel"
                  confirmText="Continue"
                  onConfirm={() => {/* Handle confirm action */ }}
                >
                  <Button variant={"bg1"} className="text-red-600">
                    Block
                  </Button>
                </CustomAlertButton>

              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Communities;
