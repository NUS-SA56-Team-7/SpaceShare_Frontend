function Footer() {
    return (

        <footer>
            <div className="bg-white py-10 px-4 border-t border-gray-200">
                <div className="w-full mx-auto max-w-screen-xl md:flex md:items-center md:justify-between">
                    <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
                        <a href="#" className="hover:txt-primary">SpaceShare</a>
                    </span>
                    <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                        <li>
                            <a href="#" className="mr-4 hover:txt-primary md:mr-6 ">Properties</a>
                        </li>
                        <li>
                            <a href="#" className="mr-4 hover:txt-primary md:mr-6">Roomates</a>
                        </li>
                        <li>
                            <a href="#" className="mr-4 hover:txt-primary md:mr-6">About</a>
                        </li>
                        <li>
                            <a href="#" className="hover:txt-primary">Contact</a>
                        </li>
                    </ul>
                </div>
            </div>
            <p className="flex h-10 items-center justify-center bg-primary px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
                Developed by Team7
            </p>
        </footer>

    );
}

export default Footer;