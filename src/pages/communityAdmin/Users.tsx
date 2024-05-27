import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    // TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  
  
const Users = () => {
  return (
    <div className="ml-10">
    <h1 className="text-2xl font-semibold  m-10 ">Users</h1>
    <Table className="mt-11">
  {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">Sl NO:</TableHead>
      <TableHead>Name</TableHead>
      <TableHead>Email</TableHead>
      <TableHead>Area</TableHead>
      <TableHead className="text-right">Action</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell className="font-medium">1</TableCell>
      <TableCell>Gopika Deepak</TableCell>
      <TableCell>example@email.com</TableCell>
      <TableCell>Dubai Investments Park</TableCell>
      <TableCell className="text-right">
        {/* Button component and also a alert dialog in it  */}
        <Button variant={"bg1"} className="text-red-600">
        <AlertDialog>
  <AlertDialogTrigger>Block</AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete the community.
        
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
</Button>

        </TableCell>
    </TableRow>
  </TableBody>
</Table>

  </div>
  )
}

export default Users