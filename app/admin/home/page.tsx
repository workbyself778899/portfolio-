"use client";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

type HomeData = {
    greeting?: string;
    s_intro?: string;
    intro?: string;
    message?: string;
    title: string;
    describe?: string;
    image?: string;
};

export default function HomeAdmin() {
    const [tags, setTags] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [tagInput, setTagInput] = useState("");
    const [homeData, setHomeData] = useState<HomeData | null>(null);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<HomeData>();

    // Fetch home data and tags
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await axios.get("/api/sections/home");
                if (res.data?.data) {
                    setHomeData(res.data.data);
                    reset(res.data.data);
                }
                const tagRes = await axios.get("/api/sections/home/tag");
                setTags(tagRes.data?.data?.tag || []);
            } catch (e) {
                // handle error
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [reset]);

    // Update Home data
    const onSubmit = async (data: HomeData) => {
        setLoading(true);
        try {
            await axios.post("/api/sections/home", data);
            toast.success("Home data updated!");
        } catch (e) {
            toast.error("Failed to update home data");
        } finally {
            setLoading(false);
        }
    };

    // Add tag
    const handleAddTag = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!tagInput.trim()) return;
        setLoading(true);
        try {
            const res = await axios.post("/api/sections/home/tag", { tag: tagInput });
            setTags(res.data.data);
            setTagInput("");
            toast.success("Tag added!");
        } catch (e) {
            toast.error("Failed to add tag");
        } finally {
            setLoading(false);
        }
    };

    // Delete tag
    const handleDeleteTag = async (tag: string) => {
        setLoading(true);
        try {
            const res = await axios.delete("/api/sections/home/tag", { data: { tag } });
            setTags(res.data.data);
            toast.success("Tag deleted!");
        } catch (e) {
            toast.error("Failed to delete tag");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mx-auto w-full max-w-2xl px-2 sm:px-0">
            <h2 className="text-2xl font-bold mb-4">Edit Home Data</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4  p-4 rounded shadow">
                <div>
                    <label className="block font-medium">Greeting</label>
                    <input className="input input-bordered w-full" {...register("greeting")} />
                </div>
                <div>
                    <label className="block font-medium">Short Intro</label>
                    <input className="input input-bordered w-full" {...register("s_intro")} />
                </div>
                <div>
                    <label className="block font-medium">Image URL</label>
                    <input className="input input-bordered w-full" {...register("image")} placeholder="https://..." />
                </div>
                <div>
                    <label className="block font-medium">Intro</label>
                    <input className="input input-bordered w-full" {...register("intro")} />
                </div>
                <div>
                    <label className="block font-medium">Message</label>
                    <textarea rows={4} className="input input-bordered w-full" {...register("message")} />
                </div>
                <div>
                    <label className="block font-medium">Title *</label>
                    <input className="input input-bordered w-full" {...register("title", { required: true })} />
                    {errors.title && <span className="text-red-500">Title is required</span>}
                </div>
                <div>
                    <label className="block font-medium">Describe</label>
                    <textarea rows={5} className="input input-bordered w-full" {...register("describe")} />
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? "Saving..." : "Save"}
                </button>
            </form>

            <h2 className="text-2xl font-bold mt-8 mb-4">Tags</h2>
            <form onSubmit={handleAddTag} className="flex gap-2 mb-4">
                <input
                    className="input input-bordered flex-1"
                    value={tagInput}
                    onChange={e => setTagInput(e.target.value)}
                    placeholder="Add new tag"
                />
                <button type="submit" className="btn btn-secondary " disabled={loading}>
                    Add Tag
                </button>
            </form>
            
            <div className="flex flex-wrap gap-2 pb-5">
                {tags.map(tag => (
                    <span key={tag} className="badge badge-outline flex items-center gap-1">
                        {tag}
                        <button
                            type="button"
                            className="ml-1 text-red-500 hover:text-red-700"
                            onClick={() => handleDeleteTag(tag)}
                            disabled={loading}
                        >
                            ×
                        </button>
                    </span>
                ))}
            </div>
        </div>
    );
}