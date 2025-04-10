import { Button, TextField, Typography, Box } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { linkSchema } from "../../zodSchemas/linkSchema.ts";
import { LinkWithoutId } from "../types";

interface Props {
    onSubmitLink: (link: LinkWithoutId) => Promise<void>;
    shortUrl?: string;
}

const LinkForm: React.FC<Props> = ({ onSubmitLink, shortUrl }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: zodResolver(linkSchema),
    });

    const onSubmit = async (data: LinkWithoutId) => {
        await onSubmitLink(data);
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

            {shortUrl && (
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h6">Your shortened URL:</Typography>
                    <Typography color="primary">
                        http://localhost:8000/{shortUrl}
                    </Typography>
                </Box>
            )}
        </Box>
    );
};

export default LinkForm;