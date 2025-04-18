import { useState } from 'react';
import { Typography } from "@mui/material";
import { useAppDispatch } from "../app/hooks.ts";
import { LinkWithoutId } from "../types";
import { createLink } from "./LinkThunks.ts";
import LinkForm from "./LinkForm.tsx";

const NewLink = () => {
    const dispatch = useAppDispatch();
    const [shortUrl, setShortUrl] = useState<string | null>(null);

    const onCreateNewLink = async (link: LinkWithoutId) => {
        try {
            const response = await dispatch(createLink(link)).unwrap();
            setShortUrl(response.shortUrl);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <>
            <Typography variant="h4" align="center" sx={{ mb: 4 }}>
                URL Shortener
            </Typography>
            <LinkForm onSubmitLink={onCreateNewLink} shortUrl={shortUrl || undefined} />
        </>
    );
};

export default NewLink;