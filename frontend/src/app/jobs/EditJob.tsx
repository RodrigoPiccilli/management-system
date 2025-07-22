import { useState } from "react";
import { Dialog, DialogDescription, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Table, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { Job } from "./columns"; 
import api from "@/lib/apis"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";


function EditJobDialog({ job, fetchJobs }: { job: Job; fetchJobs: () => void }) {
    const [form, setForm] = useState({ ...job });
    const [open, setOpen] = useState(false);

    const handleChange = (field: keyof Job) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [field]: e.target.value });
    };

    const handleDelete = async () => {
        try {
            await api.delete(`/jobs/delete/${job.jobName}`);
            fetchJobs(); 
            setOpen(false);
            console.log("Job deleted successfully!");
        } catch (error) {
            console.error("Failed to delete job: ", error);
        }
    }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api.put(`/jobs/update/${form.jobName}`, form);
      fetchJobs(); // Refresh the table after update
      setOpen(false); // Optionally close the dialog
      console.log("Job updated successfully!");
    } catch (error) {
      console.error("Failed to update job:", error);
    }
  };


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost">{job.jobName}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Job</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <Table>
            <TableBody>
              <TableRow>
                <TableHead>Job Name</TableHead>
                <TableCell>
                  <Input value={form.jobName || ""} readOnly />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableHead>Area Code</TableHead>
                <TableCell>
                  <Input value={form.areaCode || ""} onChange={handleChange("areaCode")} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableHead>Model</TableHead>
                <TableCell>
                  <Input value={form.model || ""} onChange={handleChange("model")} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableHead>Direction</TableHead>
                <TableCell>
                  <Select
                    value={ form.direction || "" }
                    onValueChange={(value) =>
                        setForm({ ...form, direction: value })
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Direction" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Per Plan">Per Plan</SelectItem>
                      <SelectItem value="Reverse">Reverse</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableHead>Stone</TableHead>
                <TableCell>
                  <Input value={form.stone || ""} onChange={handleChange("stone")} />
                </TableCell>
              </TableRow>
               <TableRow>
                <TableHead>Backsplash</TableHead>
                <TableCell>
                <Select
                    value={ form.backsplash === true ? "Yes" : form.backsplash === false ? "No" : "" }
                    onValueChange={(value) =>
                      setForm({ ...form, backsplash: value === "Yes" ? true : value === "No" ? false : undefined })
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Backsplash" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Yes">Yes</SelectItem>
                      <SelectItem value="No">No</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
             <TableRow>
                <TableHead>Install Date</TableHead>
                <TableCell>
                  <Input
                    type="date"
                    value={form.installDate ? form.installDate.substring(0, 10) : ""}
                    onChange={e => {
                        setForm({ ...form, installDate: new Date(e.target.value).toISOString() });
                    }}
                  />
                </TableCell>
              </TableRow>
               <TableRow>
                <TableHead>FT²</TableHead>
                <TableCell>
                  <Input
                    type="number"
                    value={form.ft2 != undefined ? form.ft2 : ""}
                    onChange={e =>
                        setForm({
                          ...form,
                          ft2: e.target.value === "" ? undefined : Number(e.target.value)
                        })
                      }
                  />
                </TableCell>
              </TableRow>
             <TableRow>
                <TableHead>Community</TableHead>
                <TableCell>
                  <Input value={form.community || ""} onChange={handleChange("community")} />
                </TableCell>
              </TableRow>
               <TableRow>
                <TableHead>Address</TableHead>
                <TableCell>
                  <Input value={form.address || ""} onChange={handleChange("address")} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableHead>Sink</TableHead>
                <TableCell>
                  {/* <Input value={form.sink || ""} onChange={handleChange("sink")} /> */}
                  <Select
                    value={ form.sink || "" }
                    onValueChange={(value) =>
                        setForm({ ...form, sink: value })
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Sink Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Single Bowl">Single Bowl</SelectItem>
                      <SelectItem value="50/50">50/50</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableHead>Amount</TableHead>
                <TableCell>
                <Input
                    type="number"
                    value={form.amount != null ? form.amount : ""}
                    onChange={e =>
                        setForm({...form, amount: e.target.value === "" ? undefined : Number(e.target.value)})
                    }
                />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableHead>PO Number</TableHead>
                <TableCell>
                  <Input value={form.poNumber || ""} onChange={handleChange("poNumber")} />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <DialogFooter className="mt-5">
        
            <DialogClose asChild>
              <Button variant="outline" type="button">Cancel</Button>
            </DialogClose>

            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="destructive">Delete</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle><span className="font-bold text-red-500">Delete </span>{job.jobName}?</DialogTitle>
                    <DialogDescription>This action cannot be undone.</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button type="button" variant="destructive" onClick={() => {handleDelete()}}>Delete</Button>
                    </DialogClose>
                </DialogFooter>
                </DialogContent>
            </Dialog>
  


            <DialogClose asChild>
                <Button type="submit">Save changes</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EditJobDialog;