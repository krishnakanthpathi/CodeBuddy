

function Footer() {
    return (
        <>
            <footer className="bg-white text-black py-4 rounded-lg m-4 shadow-lg">
                <div className="container mx-auto text-center">
                    <p>&copy; {new Date().getFullYear()} My Company. All rights reserved.</p>
                    <p>
                        Follow me on 
                        <a href="https://twitter.com" className="text-blue-400 ml-2">Twitter</a>, 
                        <a href="https://facebook.com" className="text-blue-400 ml-2">Facebook</a>, 
                        <a href="https://instagram.com" className="text-blue-400 ml-2">Instagram</a>
                    </p>
                </div>
            </footer>
        
        </>

);}
export default Footer;