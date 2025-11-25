'use client';
import React from 'react';
import CreateQuizPage from "@/app/quizzes/page";
import {QueryClientProvider} from "@tanstack/react-query";
import {QueryClient} from "@tanstack/query-core";
import {toast, Toaster} from "react-hot-toast";
import QuizzesPage from "@/app/quizzes/page";
import {redirect} from "next/navigation";

const queryClient = new QueryClient();

const Page = () => {
    return (
            redirect("/quizzes")

    );
};

export default Page;