import  { SetStateAction, useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

import pic1 from "../../assets/pic1.png";
import { Input } from "@/components/ui/input";
import { useGetLandingPageQuery } from "@/redux/apiSlices/landingPageSlice";
import EditCorePackage from '@/components/EditCorePackage';
import AddCorePackage from '@/components/AddCorePackage';
import CustomAlertButton from '@/components/CustomAlert';
import { Button } from '@/components/ui/button';
import { useDeleteCorePackageMutation } from '@/redux/apiSlices/adminApiSlice';

const CorePackages = () => {
  const { data: landingPageData, error: landingPageError, isLoading: landingPageLoading, refetch } = useGetLandingPageQuery(undefined);
  const [deletePackage]=useDeleteCorePackageMutation()

  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    if (!landingPageLoading && !landingPageError) {
      setLoading(false);
    }
  }, [landingPageData, landingPageLoading, landingPageError]);
const deleteImageHandler=async(id:string)=>{

try {
  await deletePackage({id})

 refetch()
 
 
} catch (e) {

}
}

  if (loading) return <div className="flex justify-center">Loading...</div>;
  if (landingPageError) return <div className="flex justify-center text-4xl">Something went wrong...</div>;
  if (!landingPageData) return <div className="flex justify-center text-4xl">No data available...</div>;

  const filteredPackages = landingPageData.corePackage.filter((item: { name: string; shortDescription: string }) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.shortDescription.toLowerCase().includes(searchQuery.toLowerCase())
  );
  let paginatedPackages
  if(filteredPackages.length>itemsPerPage){
     paginatedPackages = filteredPackages.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }else{
    paginatedPackages=filteredPackages
  }
  
  const totalPages = Math.ceil(filteredPackages.length / itemsPerPage);
  const handlePageChange = (page: SetStateAction<number>) => {
    setCurrentPage(page);
  };
  return (
    <div className="ml-10">
      <h1 className="text-2xl font-semibold m-10">Core Packages</h1>
      <div className="flex justify-between">
        <div className="flex items-center space-x-2">
          <Input
            type="text"
            className="px-3 py-2 w-80"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div>
        <div className="border border-green-800  p-2 rounded-md min-w-36 max-w-48 text-center">

            <AddCorePackage refetch={refetch}/>
          </div>
        </div>
      </div>
      <Table className="mt-11">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Sl NO:</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Image</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedPackages.map((item: { _id: string; name: string; image: { url: string; publicId: string }; shortDescription: string }, index: number) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{(currentPage - 1) * itemsPerPage + index + 1}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.shortDescription}</TableCell>
              <TableCell>
                <img src={item.image.url || pic1} alt={item.name} className="w-[200px]" />
              </TableCell>
              <TableCell className="text-right">
                <EditCorePackage refetch={refetch} packageData={item} />
                <CustomAlertButton
                  title="Are you absolutely sure?"
                  description="This action cannot be undone. This will permanently delete the core package."
                  cancelText="Cancel"
                  confirmText="Continue"
                  onConfirm={() => deleteImageHandler(item._id)}
                >
                  <Button className="bg-red-300 p-2 text-black ml-2 hover:bg-red-500">
                    Delete
                  </Button>
                </CustomAlertButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {filteredPackages.length>itemsPerPage&&(
      <Pagination className="fixed bottom-5 left-0">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage > 1) handlePageChange(currentPage - 1);
              }}
            />
          </PaginationItem>
          {[...Array(totalPages)].map((_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(index + 1);
                }}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          {totalPages > 5 && currentPage < totalPages - 1 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage < totalPages) handlePageChange(currentPage + 1);
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      )}
      
    </div>
  );
};

export default CorePackages;
