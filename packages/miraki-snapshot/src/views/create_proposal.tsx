import { z } from "zod";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import MDEditor, { selectWord } from "@uiw/react-md-editor";
// No import is required in the WebPack.
import "@uiw/react-md-editor/markdown-editor.css";
// No import is required in the WebPack.
import "@uiw/react-markdown-preview/markdown.css";
import { useTheme } from "styled-components";


const proposalFormSchema = z.object({
  // space: z.number(),
  title: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  description: z.string().nullable(),
  strategy_details: z.object({
    id: z.string(),
    token_address: z.string(), // Assuming valid token address format
    token_per_vote: z.string(),
  }),
  // Timestamp should be sent to backend in format
  // yyyy-mm-ddTHH:MM:SS
  options: z.array(z.string().min(1, { message: "Atlest add one option." })),
  start_timestamp: z.date({
    required_error: "Start date is required",
  }),
  end_timestamp: z.date({
    required_error: "End date is required",
  }),
});

export default function CreateProposalView() {
  const form = useForm<z.infer<typeof proposalFormSchema>>({
    resolver: zodResolver(proposalFormSchema),
    defaultValues: {
      space: '1',
      strategy_details: {
        // Set a default id here
        id: "spl-token-balance",
        token_address: '',
        token_per_vote: '',
      },
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "options",
    control: form.control,
  });

  function onSubmit(values: z.infer<typeof proposalFormSchema>) {
    console.log(values);
  }

  React.useEffect(() => {
    append("");
  }, []);


  return (
    <div
      style={{
        paddingLeft: "20%",
        paddingRight: "20%",
        paddingBottom: "150px",
        paddingTop: "50px",
      }}
    >
      <h1
        className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl"
        style={{ textAlign: "center", marginBottom: "30px" }}
      >
        Create a proposal
      </h1>
      <div></div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Proposal Title</FormLabel>
                <FormControl>
                  <Input placeholder="Title" {...field} />
                </FormControl>
                <FormDescription>
                  This will be your Proposal's title.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Proposal Description</FormLabel>
                <FormControl>
                  <MDEditor
                    // className="tracking-tight w-md-editor-show-live"
                    height={600}
                    value={field.value}
                    onChange={(value) => field.onChange(value)}
                    data-color-mode={localStorage.getItem("theme")}
                  />
                </FormControl>

                <FormDescription>
                  This will be your Proposal's description.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            {fields.map((field, index) => (
              <FormField
                control={form.control}
                key={field.id}
                name={`options.${index}`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={cn(index !== 0 && "sr-only")}>
                      Voting Options
                    </FormLabel>
                    <FormDescription className={cn(index !== 0 && "sr-only")}>
                      Add your voting options here.
                    </FormDescription>
                    <div style={{ display: "flex" }}>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder={`Add option ${index + 1}`}
                        />
                      </FormControl>
                      {fields.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="ml-2"
                          onClick={() => remove(index)}
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={() => append("")}
            >
              Add option
            </Button>
          </div>
          <FormField
            control={form.control}
            name="strategy_details.token_address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Strategy Details</FormLabel>
                <FormControl>
                  <Input placeholder="Token address" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="strategy_details.token_per_vote"
            render={({ field }) => (
              <FormItem style={{ marginTop: "10px" }}>
                <FormControl>
                  <Input type="number" placeholder="Token per vote" {...field} />
                </FormControl>
                <FormDescription>
                  This will be your strategy details.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div style={{ display: "flex", flexWrap: "wrap", gap: "30px" }}>
            <FormField
              control={form.control}
              name="start_timestamp"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Start date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a start date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                  <FormDescription>
                    These will be your start and end date.
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="end_timestamp"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>End date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a end date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
