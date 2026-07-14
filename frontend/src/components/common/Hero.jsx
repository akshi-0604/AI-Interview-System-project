import Button from "./Button";

function Hero() {
    return (
        <section className="min-h-[90vh] flex items-center justify-center bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 text-white">

            <div className="max-w-6xl mx-auto px-6 text-center">

                <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                    AI-Powered
                    <br />
                    Interview Platform
                </h1>

                <p className="mt-8 text-lg md:text-xl text-gray-200 max-w-3xl mx-auto leading-8">
                    Revolutionize your hiring process with AI-driven interviews,
                    intelligent resume analysis, live proctoring, adaptive questioning,
                    and automated candidate evaluation.
                </p>

                <div className="mt-10 flex flex-col sm:flex-row justify-center gap-5">

                    <Button
                        text="Start Interview"
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                    />

                    <Button
                        text="Learn More"
                        className="bg-white text-blue-700 hover:bg-gray-200"
                    />

                </div>

            </div>

        </section>
    );
}

export default Hero;