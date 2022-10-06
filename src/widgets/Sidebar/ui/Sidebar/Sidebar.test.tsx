import { render, screen } from "@testing-library/react"
import { Sidebar } from "widgets/Sidebar/ui"


describe('Sidebar', () => {
    test('Test render', () => {
        render(<Sidebar/>)
        expect(screen.getByText("TEST")).toBeInTheDocument()
    })
})