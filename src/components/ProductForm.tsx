import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
function ProductForm() {
   const form = useForm({
      defaultValues: {
         productName: "",
         productDescription: "",
         price: "",
         Images: [],
         category: "",
         properties: [],
         stock: "",
         addedBy: "667495d43b969d9e6e1ab318",
      },
   });

   const onSubmit = async (data: any) => {
      console.log("Data: ", data);
   };
   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
               name="productName"
               control={form.control}
               render={({ field }) => (
                  <FormItem>
                     <label>productName</label>
                     <input {...field} />
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               name="productDescription"
               control={form.control}
               render={({ field }) => (
                  <FormItem>
                     <label>descriptions</label>
                     <input type="password" {...field} />
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               name="price"
               control={form.control}
               render={({ field }) => (
                  <FormItem>
                     <label>price</label>
                     <input type="password" {...field} />
                     <FormMessage />
                  </FormItem>
               )}
            />
            <button className="w-full" type="submit">
               Sign In
            </button>
         </form>
      </Form>
   );
}

export default ProductForm;
