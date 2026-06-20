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
  TextArea,
} from "@heroui/react";
import {
  Check,
  ArrowShapeUpToLine,
  House,
  Envelope,
  Tag,
  BellDot,
  ShieldAlert,
} from "@gravity-ui/icons";
import toast from "react-hot-toast";
import { createStartup } from "@/lib/actions/startups";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { FaShield } from "react-icons/fa6";

export default function CreateStartup({ startup, startups }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const router = useRouter();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
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

    const startupData = {
      startup_name: formData.get("startupName"),
      industry: formData.get("industry"),
      description: formData.get("description"),
      fundingStage: formData.get("fundingStage"),
      founderEmail: user?.email,
      logo: logoUrl,
      status: "pending",
      startupId: startup?.id || "startup123",
    };

    const res = await createStartup(startupData);
    setIsSubmitting(false);

    if (res?.insertedId) {
      toast.success("Startup created successfully!");
      setImagePreview(null);
      e.target.reset();
      router.push("/dashboard/founder");
    } else {
      toast.error("Failed to create the startup record in the database.");
    }
  };

  // 1. CONDITIONAL DISPLAY: If a startup profile already exists, show details card instead of form
  if (startups && startups.length === 1) {
    const activeStartup = startups[0];

    const statusStyles = {
      pending: "bg-amber-50 text-amber-700 border-amber-200",
      approved: "bg-emerald-50 text-emerald-700 border-emerald-200",
      rejected: "bg-rose-50 text-rose-700 border-rose-200",
    };

    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-zinc-50 p-4 py-12">
        <Card className="w-full max-w-xl p-6 sm:p-8 bg-white border border-zinc-200 rounded-2xl shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-zinc-50 border border-zinc-200 flex items-center justify-center overflow-hidden p-1">
                {activeStartup.logo ? (
                  <Image
                    width={200}
                    height={200}
                    src={activeStartup.logo}
                    alt="Startup Logo"
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <House size={20} className="text-zinc-400" />
                )}
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-zinc-900">
                  {activeStartup.name}
                </h1>
                <p className="text-xs text-zinc-400">
                  Registered Startup Profile
                </p>
              </div>
            </div>
            <span
              className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border capitalize ${statusStyles[activeStartup.status] || "bg-zinc-50 text-zinc-600"}`}
            >
              {activeStartup.status || "pending"}
            </span>
          </div>

          <div className="space-y-4">
            <div className="text-sm text-zinc-600 leading-relaxed bg-zinc-50 p-4 rounded-xl border border-zinc-100">
              <p className="font-medium text-zinc-400 text-xs uppercase tracking-wider mb-1">
                Company Vision
              </p>
              {activeStartup.description}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              <div className="flex items-center gap-2.5 text-sm text-zinc-600 bg-zinc-50/50 p-3 rounded-xl border border-zinc-100">
                <Tag size={16} className="text-zinc-400" />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                    Industry
                  </p>
                  <p className="font-semibold text-zinc-800 uppercase text-xs">
                    {activeStartup.industry || "General"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 text-sm text-zinc-600 bg-zinc-50/50 p-3 rounded-xl border border-zinc-100">
                <BellDot size={16} className="text-zinc-400" />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                    Funding Stage
                  </p>
                  <p className="font-semibold text-zinc-800 capitalize text-xs">
                    {activeStartup.fundingStage || "Idea"}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2.5 text-sm text-zinc-600 bg-zinc-50/50 p-3 rounded-xl border border-zinc-100">
              <Envelope size={16} className="text-zinc-400" />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                  Founder Operations Email
                </p>
                <p className="font-semibold text-zinc-800 text-xs">
                  {activeStartup.founderEmail}
                </p>
              </div>
            </div>
          </div>

          {activeStartup.status !== "approved" && (
            <div className="flex items-start gap-2.5 p-3 rounded-xl border border-amber-100 bg-amber-50/40 text-xs text-amber-800">
              <FaShield size={16} className="mt-0.5 shrink-0" />
              <p>
                Your profile is locked under administrative screening. You will
                unlock opportunity deployment once verification clears.
              </p>
            </div>
          )}
        </Card>
      </div>
    );
  }

  // 2. DEFAULT DISPLAY: Show standard registration form if no startup profile is loaded
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-zinc-50 p-4 py-12">
      <Card className="w-full max-w-xl p-6 sm:p-8 bg-white border border-zinc-200 rounded-2xl shadow-sm space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
            Register your Startup
          </h1>
          <p className="text-sm text-zinc-500">
            Share your vision and connect with potential collaborators
          </p>
        </div>

        <Form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Startup Name */}
          <TextField isRequired name="startupName" type="text">
            <Label className="text-sm font-medium text-zinc-700">
              Startup Name
            </Label>
            <Input placeholder="e.g., ForgeAI" />
          </TextField>

          {/* Logo File Upload */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-zinc-700">
              Startup Logo <span className="text-danger">*</span>
            </label>
            <div className="border-2 border-dashed border-zinc-200 rounded-xl p-4 hover:bg-zinc-50 transition relative flex flex-col items-center justify-center gap-2 cursor-pointer min-h-30">
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
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
          </div>

          {/* Industry Selection */}
          <div className="flex flex-col gap-1">
            <Select isRequired name="industry" defaultValue="saas">
              <Label className="text-sm font-medium text-zinc-700">
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
              <Label className="text-sm font-medium text-zinc-700">
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
            <Label className="text-sm font-medium text-zinc-700">
              Founder Email
            </Label>
            <Input placeholder={user?.email} readOnly />
          </TextField>

          {/* Description */}
          <div className="w-full flex flex-col gap-1">
            <Label className="text-sm font-medium text-zinc-700">
              Description
            </Label>
            <TextArea
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
              className="flex-1 font-medium bg-zinc-900 text-white hover:opacity-90"
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
