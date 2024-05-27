import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from "./ui/input-otp";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl,  FormField, FormItem,  FormLabel,  FormMessage } from "./ui/Form";
import { useVerifyOTPMutation } from "@/redux/apiSlices/commAdminApiSlice";
import { useNavigate } from "react-router-dom";
const FormSchema = z.object({
    pin: z.string().min(6, {
      message: "Your one-time password must be 6 characters.",
    }),
  })

  interface OtpComponentProps {
    commAdminId: string;
  }
  
  const OtpComponent: React.FC<OtpComponentProps> = ({commAdminId}) => {
  
  const [verifyOTP]=useVerifyOTPMutation()
  const navigate=useNavigate()

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        
      })
  const onSubmit = async(data: z.infer<typeof FormSchema>) => {
    try{
      console.log(data);
      const res:any=await verifyOTP({...data,commAdminId})
      

      if (res.error?.data) {
        
        if (res.error.data.message) {
          form.setError("root", {
            message: res.error.data.message
          });
          
        }else{
          form.setError("root", {
            message: res.error.data
          });
      }
      }else{
        navigate('/api/comm-admin/login')
      }

    }catch(e){

    }
    
  };

  return (
    <div className="mt-36">
      <Card>
        
          <CardHeader>
            <CardTitle>One-Time Password</CardTitle>
            <CardDescription>Please enter the OTP sent to your registered email</CardDescription>
          </CardHeader>
          <CardContent>
          <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
      {form.formState.errors.root && (
            <FormItem>
              <FormLabel className="text-destructive">
                {form.formState.errors.root.message}
              </FormLabel>
            </FormItem>
          )}
        <FormField
          control={form.control}
          name="pin"
          render={({ field }) => (
            <FormItem>
              
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />

<Button type="submit" variant={"bg1"}>
              Submit
            </Button>
      </form>
    </Form>

           
          </CardContent>
      
      </Card>
    </div>
  );
};

export default OtpComponent;
