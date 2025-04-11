import {Button, TextField, Typography, Box, Link} from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { linkSchema } from "../../zodSchemas/linkSchema.ts";
import { LinkWithoutId, OriginalUrl} from "../types";
import {useAppSelector} from "../app/hooks.ts";
import {selectFetchLinksLoading} from "./LinksSlices.ts";
import Spinner from "../components/Spinner/Spinner.tsx";
import React from "react";

interface Props {
    onSubmitLink: (link: LinkWithoutId) => Promise<void>;
    shortUrl?: string;
}

const LinkForm: React.FC<Props> = ({ onSubmitLink, shortUrl }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: zodResolver(linkSchema),
    });
    const loading = useAppSelector(selectFetchLinksLoading);

    const onSubmit = async (link: OriginalUrl) => {
        await onSubmitLink(link);
        reset();
    };

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ maxWidth: 500, mx: "auto", mt: 4 }}>
            <TextField
                fullWidth
                margin="normal"
                label="Original URL"
                {...register("originalUrl")}
                error={!!errors.originalUrl}
                helperText={errors.originalUrl?.message}
            />
            <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                Shorten URL
            </Button>

            {loading ? <Spinner/> : shortUrl && (
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h6">Your shortened URL:</Typography>
                    <Link
                        href={`http://localhost:8000/${shortUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        color="primary"
                        underline="hover"
                    >
                        http://localhost:8000/{shortUrl}
                    </Link>
                </Box>
            )}

        </Box>
    );
};

export default LinkForm;