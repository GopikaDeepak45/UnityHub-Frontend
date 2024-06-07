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
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
  reason: z.string().trim().min(2, {
    message: "Reason cannot be empty",
  }),
})


import { SetStateAction, useEffect, useState } from "react";
import { useBlockCommunityMutation, useFetchCommunityDataQuery } from "@/redux/apiSlices/adminApiSlice";

import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/Form";

const Communities = () => {

  // Use the Redux Toolkit Query hook to fetch community data
  const { data = [], error, isLoading ,refetch} = useFetchCommunityDataQuery(undefined);
  const [blockCommunity] = useBlockCommunityMutation(undefined)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reason: "",
    },
  })
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showBlockModal, setShowBlockModal] = useState(true);
  const [selectedCommunityId, setSelectedCommunityId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

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

  const filteredCommunities = communities.filter((community: any) =>
    community.communityId.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    community.communityId.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    community.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    community.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  let paginatedCommunities
  if (filteredCommunities.length > itemsPerPage) {
    paginatedCommunities = filteredCommunities.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  } else {
    paginatedCommunities = filteredCommunities
  }
  //to manage modal display
  const handleShowBlockModal = (communityId:any) => {
    setSelectedCommunityId(communityId);
    setShowBlockModal(true);
  };
const onSubmit=async(values: z.infer<typeof formSchema>)=> {
    try {
      await blockCommunity({ ...values, communityId: selectedCommunityId });
      refetch();
      setShowBlockModal(false)
        form.reset();
    } catch (e) {

    }
  }
 
  console.log('paginated comm', paginatedCommunities)
  const totalPages = Math.ceil(filteredCommunities.length / itemsPerPage);
  const handlePageChange = (page: SetStateAction<number>) => {
    setCurrentPage(page);
  };
  return (
    <div className="ml-10">
      <h1 className="text-2xl font-semibold m-10">Communities</h1>
      <Input
        type="text"
        className="px-3 py-2 w-80"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
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
          {paginatedCommunities.map((elem: any, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{(currentPage - 1) * itemsPerPage + index + 1}</TableCell>
              <TableCell>{elem.communityId.name}</TableCell>
              <TableCell>{elem.communityId.location}</TableCell>
              <TableCell>{elem.userName}</TableCell>
              <TableCell>{elem.email}</TableCell>
              <TableCell>{elem.mobileNo}</TableCell>
              <TableCell className="text-right">
                <AlertDialog>
                  <AlertDialogTrigger onClick={() => handleShowBlockModal(elem.communityId._id)} className="rounded-md bg-red-500 p-2 text-black ml-2 hover:bg-red-700 ">Block</AlertDialogTrigger>
                  {showBlockModal && (
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-red-500 pb-5 mx-auto">Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>

                        <Form {...form}>
                          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                              control={form.control}
                              name="reason"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Please enter the reason for blocking</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Reason" {...field} />
                                  </FormControl>

                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <div className="flex justify-between">
                            {!form.formState.isSubmitting&&(
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                              </AlertDialogFooter>
                            )}
                              <Button type="submit" className="rounded-md bg-red-500 p-2 text-black ml-2 hover:bg-red-700 ">{form.formState.isSubmitting?"Loading...":"Block"}</Button>
                            </div>
                          </form>
                        </Form>
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                  </AlertDialogContent>
                  )}
                </AlertDialog>

              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {filteredCommunities.length > itemsPerPage && (
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

export default Communities;
