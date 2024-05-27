import {
  Table,
  TableBody,
  // TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import pic1 from "../../assets/pic1.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import MyCard from "@/components/MyCard";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/Form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { uploadImage } from "@/utils/uploadImage";
import { useAddCorePackageMutation } from "@/redux/apiSlices/adminApiSlice";
import { useGetLandingPageQuery } from "@/redux/apiSlices/landingPageSlice";

const formSchema = z.object({
  name: z.string(), // Define image type schema
  imageUrl: z.string(),
  publicId:z.string(), // Validate that imageUrl is a valid URL
  shortDescription:z.string()
});

// Define FormData type with all form fields
type FormData = z.infer<typeof formSchema>;

const CorePackages = () => {
  
  const { data: landingPageData, error: landingPageError, isLoading: landingPageLoading,refetch } = useGetLandingPageQuery(undefined);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:{
      name:"",
      imageUrl: "",
      publicId:"",
      shortDescription:""
    }   
  });
  const [addCorePackge]=useAddCorePackageMutation()

  //for image file data
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);

  //to take file input
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };
  const onSubmit = async (values: FormData) => {
    console.log('onsubmit called',values)
    try {
      if (!selectedFile) {
        throw new Error('Please select an image');
      }
      // Upload the selected file to cloudinary and get the URL
      // Upload the selected file to cloudinary and get the URL
      const uploadResult = await uploadImage(selectedFile);
      if (uploadResult === null) {
        throw new Error('Failed to upload image');
      }
      
      const { url, publicId } = uploadResult;
      if (!url || !publicId ) {
        throw new Error('Failed to upload image');
      }

      // Include the image URL in the form data
      const formDataWithImageUrl: FormData = {
        ...values,
        imageUrl: url,
      publicId: publicId,
      };// Make a request to the backend with the form data
      console.log('with img',formDataWithImageUrl)
      await addCorePackge (formDataWithImageUrl);
      // Reset the form after successful submission
      refetch()
      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      form.setError("root", {
        message: "Error adding Core Package"
      });
    }
  };

  useEffect(() => {
    // Update the state when landing page data is fetched successfully
    if (!landingPageLoading && !landingPageError) {
      setLoading(false);
    }
  }, [landingPageData, landingPageLoading, landingPageError]);
  if (landingPageError) {
    return <div className=" flex  justify-center text-4xl "> Something went wrong!..</div>;
  }
  if (loading) {
    return <div className=" flex  justify-center ">Loading...</div>;
  }

  return (
    <div className="ml-10">
      <h1 className="text-2xl font-semibold m-10">Core Packages</h1>
      <div className="flex justify-between">
        <div className="flex items-center space-x-2">
          <Input
            type="text"
            className="px-3 py-2 w-80"
            placeholder="Search..."
          />
         
        </div>
        <div>
        <div className="border border-green-800  p-2 rounded-md min-w-36 max-w-48 text-center">

            <AlertDialog>
              <AlertDialogTrigger>Add New Package</AlertDialogTrigger>
              <AlertDialogContent>
                <MyCard title="" description="" footer="">
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-8"
                    >
                      {form.formState.errors.root && (
                        <FormItem>
                          <FormLabel className="text-destructive">
                            Error adding new Package
                          </FormLabel>
                        </FormItem>
                      )}
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Package Name</FormLabel>
                            <FormControl>
                              <Input type="text" {...field}/>
                              
                            </FormControl>
                            <FormDescription></FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="imageUrl"
                        render={() => (
                          <FormItem>
                            <FormLabel>Image URL</FormLabel>
                            <FormControl>
                              <Input type="file" onChange={handleFileChange} accept="image/*"  />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="shortDescription"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Input type="text" {...field}/>
                              
                            </FormControl>
                            <FormDescription></FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="flex justify-around">
                      {!form.formState.isSubmitting&&(
                       <AlertDialogCancel>Cancel</AlertDialogCancel>
                    )}
                        <Button
                          type="submit"
                          disabled={form.formState.isSubmitting}
                          variant={"bg1"}
                        >
                          {form.formState.isSubmitting
                            ? "Loading..."
                            : "Submit"}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </MyCard>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
      <Table className="mt-11">
        {/* <TableCaption>A list of core packages available.</TableCaption> */}
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
          {landingPageData?.corePackage.map((item:{name:string,image:{url:string,publicId:string},shortDescription:string}, index:number) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.shortDescription}</TableCell>
              <TableCell>
                <img src={item.image.url || pic1} alt={item.name} className="w-[200px]" />
              </TableCell>
              <TableCell className="text-right">
                <Button variant="bg1">Edit</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CorePackages;
