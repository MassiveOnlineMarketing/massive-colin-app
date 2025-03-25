"use client";

import React from 'react'
import { z } from 'zod';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateDownloadLinkAction } from '@/data/download-links';
import { DownloadLinks } from '@prisma/client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Box } from 'lucide-react';


const UpdateDownloadLinkSchema = z.object({
  key: z.enum(['WINDOWS', 'MAC']),
  link: z.string().min(2)
})

const UpdateDownloadLinksForms = ({ links }: { links: DownloadLinks[] }) => {
  const windowsForm = useForm<z.infer<typeof UpdateDownloadLinkSchema>>({
    resolver: zodResolver(UpdateDownloadLinkSchema),
    defaultValues: {
      key: "WINDOWS",
      link: ""
    }
  });

  const macForm = useForm<z.infer<typeof UpdateDownloadLinkSchema>>({
    resolver: zodResolver(UpdateDownloadLinkSchema),
    defaultValues: {
      key: "MAC",
      link: ""
    }
  });

  const onSubmit = (values: z.infer<typeof UpdateDownloadLinkSchema>) => {
    updateDownloadLinkAction(values)
  }

  return (
    <div className='grid grid-cols-2 gap-2 max-w-[1400px] mx-auto px-12 pt-12'>
      <Form {...windowsForm}>
        <form onSubmit={windowsForm.handleSubmit(onSubmit)}>
          <FormField
            control={windowsForm.control}
            name="link"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Windows Download Link</FormLabel>
                <FormControl>
                  <Input
                    Icon={Box}
                    {...field}
                    placeholder={
                      links.find(link => link.key === 'WINDOWS')?.link
                    }
                    className="text-black"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button className='border mt-2' type='submit'>Submit</Button>
        </form>
      </Form>


      <Form {...macForm}>
        <form onSubmit={macForm.handleSubmit(onSubmit)}>
          <FormField
            control={macForm.control}
            name="link"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mac Download Link</FormLabel>
                <FormControl>
                  <Input
                    Icon={Box}
                    {...field}
                    placeholder={
                      links.find(link => link.key === 'MAC')?.link
                    }
                    className="text-black"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button className='border mt-2' type='submit'>Submit</Button>
        </form>
      </Form>

    </div>
  )
}

export default UpdateDownloadLinksForms