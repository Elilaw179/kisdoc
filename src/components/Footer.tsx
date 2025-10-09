export function Footer() {
    return (
        <footer className="border-t py-6 mt-12">
            <div className="container mx-auto text-center text-sm text-muted-foreground">
                <p>&copy; {new Date().getFullYear()} NutriGuide AI. All rights reserved.</p>
            </div>
        </footer>
    )
}
