import React, { useState } from 'react';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MyCard from "@/components/MyCard";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { uploadImage } from "@/utils/uploadImage";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/Form';
import { useEditCorePackageMutation } from '@/redux/apiSlices/adminApiSlice';

const formSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Package name is required"),
  imageUrl: z.string().optional(),
  publicId: z.string().optional(),
  shortDescription: z.string().min(1, "Description is required"),
});

type FormData = z.infer<typeof formSchema>;

const EditCorePackage = ({ refetch, packageData }: { refetch: () => void, packageData: any }) => {

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: packageData._id,
      name: packageData.name,
      imageUrl: packageData.image.url,
      publicId: packageData.image.publicId,
      shortDescription: packageData.shortDescription,
    }
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [editCorePackage] = useEditCorePackageMutation();
  const [showAddModal, setShowAddModal] = useState(true);
  const [image] = useState(packageData.image.url)


  //to manage modal display
  const handleShowAddModal = () => {
    setShowAddModal(true);
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const onSubmit = async (values: FormData) => {
    try {
      let imageUrl = values.imageUrl;
      let publicId = values.publicId;

      if (selectedFile) {
        const uploadResult = await uploadImage(selectedFile);
        if (!uploadResult?.url || !uploadResult?.publicId) {
          throw new Error('Failed to upload image');
        }
        imageUrl = uploadResult.url;
        publicId = uploadResult.publicId;
      }

      const formDataWithImageUrl: FormData = {
        ...values,
        imageUrl,
        publicId,

      };

      const res: any = await editCorePackage(formDataWithImageUrl);

      if (res.error?.data?.message) {
        form.setError("root", { message: res.error.data.message });
      } else {
        refetch();
        setShowAddModal(false)
        form.reset();
      }
    } catch (error) {
      form.setError("root", { message: "Error editing Core Package" });
    }
  };

  return (

    <AlertDialog>
      <AlertDialogTrigger onClick={handleShowAddModal}><Button className="bg-green-500 p-4 text-black ml-2 hover:bg-green-700">
        Edit
      </Button></AlertDialogTrigger>
      {showAddModal && (
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
                      {form.formState.errors.root.message}
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
                        <Input  {...field} />

                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <img src={image} className="w-[200px]" />

                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={() => (
                    <FormItem>
                      <FormLabel>Choose Another Image</FormLabel>
                      <FormControl>
                        <Input type="file" onChange={handleFileChange} accept="image/*" />
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
                        <Input type="text" {...field} />

                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-around">
                  {!form.formState.isSubmitting && (
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
      )}
    </AlertDialog>
  );
};

export default EditCorePackage;
