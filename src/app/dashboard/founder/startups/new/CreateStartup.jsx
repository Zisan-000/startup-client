"use client";

import React, { useState } from "react";
import {
  Button,
  Card,
  Form,
  Input,
  Label,
  TextField,
  Select,
  Description,
  ListBox,
  Textarea,
  TextArea, // FIXED: Changed from TextArea to Textarea
} from "@heroui/react";
import { Check, ArrowShapeUpToLine } from "@gravity-ui/icons";
import toast from "react-hot-toast";
import { createStartup } from "@/lib/actions/startups";
import { redirect } from "next/navigation";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";

export default function CreateStartup({ startup }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Creates a temporary local URL for the selected file
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const file = formData.get("logo");

    if (!file || file.size === 0) {
      toast.error("Please upload a startup logo");
      setIsSubmitting(false);
      return;
    }

    // 1. Handle ImgBB Upload
    const imgbbFormData = new FormData();
    imgbbFormData.append("image", file);

    const imagebbapikey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

    if (!imagebbapikey) {
      toast.error("ImgBB API key is missing from environment variables.");
      setIsSubmitting(false);
      return;
    }

    const imgbbResponse = await fetch(
      `https://api.imgbb.com/1/upload?key=${imagebbapikey}`,
      {
        method: "POST",
        body: imgbbFormData,
      },
    );

    const imgbbData = await imgbbResponse.json();

    if (!imgbbData.success) {
      toast.error(imgbbData.error?.message || "Logo upload to ImgBB failed");
      setIsSubmitting(false);
      return;
    }

    const logoUrl = imgbbData.data.url;

    // 2. Build Form Payload (ADDED: status: "pending")
    const startupData = {
      name: formData.get("startupName"),
      industry: formData.get("industry"),
      description: formData.get("description"),
      fundingStage: formData.get("fundingStage"),
      founderEmail: user?.email,
      logo: logoUrl,
      status: "pending",
      startupId: startup?.startupId || "startup123",
    };

    // 3. Database Insertion & Redirect Flow
    const res = await createStartup(startupData);

    setIsSubmitting(false);

    if (res?.insertedId) {
      toast.success("Startup created successfully!");
      setImagePreview(null);
      e.target.reset();
      redirect("/dashboard/founder");
    } else {
      toast.error("Failed to create the startup record in the database.");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-zinc-50 dark:bg-zinc-900 p-4 py-12">
      <Card className="w-full max-w-xl p-6 sm:p-8 bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700/50 shadow-sm space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Register your Startup
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Share your vision and connect with potential collaborators
          </p>
        </div>

        <Form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Startup Name */}
          <TextField isRequired name="startupName" type="text">
            <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Startup Name
            </Label>
            <Input placeholder="e.g., ForgeAI" />
          </TextField>

          {/* Logo File Upload */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Startup Logo <span className="text-danger">*</span>
            </label>
            <div className="border-2 border-dashed border-zinc-200 dark:border-zinc-700 rounded-xl p-4 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition relative flex flex-col items-center justify-center gap-2 cursor-pointer min-h-30">
              {imagePreview ? (
                <div className="flex flex-col items-center gap-2">
                  <Image
                    width={200}
                    height={200}
                    src={imagePreview}
                    alt="Preview"
                    className="w-16 h-16 object-cover rounded-lg border border-zinc-200"
                  />
                  <span className="text-xs text-success font-medium">
                    Image selected ready to upload!
                  </span>
                </div>
              ) : (
                <>
                  <ArrowShapeUpToLine className="text-zinc-400 w-5 h-5" />
                  <span className="text-xs text-zinc-500 text-center">
                    Click to upload logo image file
                  </span>
                </>
              )}
              <input
                required
                type="file"
                name="logo"
                accept="image/*"
                onChange={handleFileChange} // FIXED: Added missing change event handler
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
          </div>

          {/* Industry Selection */}
          <div className="flex flex-col gap-1">
            <Select isRequired name="industry" defaultValue="saas">
              <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Industry
              </Label>
              <Select.Trigger>
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover>
                <ListBox>
                  <ListBox.Item id="saas" textValue="SaaS / Software">
                    <Label>SaaS / Software</Label>
                    <Description className="pl-3">
                      Digital tools and cloud platforms
                    </Description>
                  </ListBox.Item>
                  <ListBox.Item id="ai" textValue="Artificial Intelligence">
                    <Label>Artificial Intelligence</Label>
                    <Description className="pl-3">
                      Machine learning and automation
                    </Description>
                  </ListBox.Item>
                  <ListBox.Item id="fintech" textValue="Fintech">
                    <Label>Fintech</Label>
                    <Description className="pl-3">
                      Financial apps and web-3 services
                    </Description>
                  </ListBox.Item>
                </ListBox>
              </Select.Popover>
            </Select>
          </div>

          {/* Funding Stage Selection */}
          <div className="flex flex-col gap-1">
            <Select isRequired name="fundingStage" defaultValue="seed">
              <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Funding Stage
              </Label>
              <Select.Trigger>
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover>
                <ListBox>
                  <ListBox.Item id="idea" textValue="Idea / Pre-seed">
                    <Label>Idea / Pre-seed</Label>
                    <Description className="pl-3">
                      Early concept phase
                    </Description>
                  </ListBox.Item>
                  <ListBox.Item id="seed" textValue="Seed">
                    <Label>Seed</Label>
                    <Description className="pl-3">
                      Validating product and initial growth
                    </Description>
                  </ListBox.Item>
                  <ListBox.Item id="series-a" textValue="Series A+">
                    <Label>Series A+</Label>
                    <Description className="pl-3">
                      Scaling operations and revenue
                    </Description>
                  </ListBox.Item>
                </ListBox>
              </Select.Popover>
            </Select>
          </div>

          {/* Founder Email */}
          <TextField isRequired name="founderEmail" type="email">
            <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Founder Email
            </Label>
            <Input placeholder={user?.email} readOnly />
          </TextField>

          {/* Description */}
          <div className="w-full flex flex-col gap-1">
            <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Description
            </Label>
            <TextArea // FIXED: Component case normalization
              isRequired
              name="description"
              placeholder="Tell us about your startup's mission and product..."
              minRows={3}
            />
          </div>

          {/* Form Actions */}
          <div className="flex gap-3 pt-2">
            <Button
              type="submit"
              isLoading={isSubmitting}
              className="flex-1 font-medium bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900 hover:opacity-90"
            >
              {!isSubmitting && <Check className="w-4 h-4" />}
              Publish Startup
            </Button>
            <Button
              type="reset"
              variant="flat"
              className="flex-1 font-medium"
              isDisabled={isSubmitting}
              onClick={() => setImagePreview(null)}
            >
              Reset
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
}
