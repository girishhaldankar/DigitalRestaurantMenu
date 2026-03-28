/**
 * Prints the menu card using the browser's native print dialog.
 *
 * Why this is better than html2canvas / html-to-image:
 * - Uses the browser's own rendering engine → pixel-perfect output
 * - Fonts, blur, colors, letter-spacing all render exactly as seen on screen
 * - User can choose "Save as PDF" in the print dialog for a PDF file
 * - Or send directly to a physical printer
 *
 * The @media print CSS in print.css hides everything except #pdf-menu-container.
 */
export const generateMenuPDF = (element: HTMLElement): Promise<true> => {
    return new Promise((resolve, reject) => {
        try {
            // Tag the element so the print CSS can target it
            element.setAttribute('data-print-target', 'true');

            // Give the browser a tick to apply the attribute, then print
            requestAnimationFrame(() => {
                window.print();
                // Remove the tag after the print dialog opens
                setTimeout(() => {
                    element.removeAttribute('data-print-target');
                    resolve(true);
                }, 500);
            });
        } catch (err) {
            reject(err);
        }
    });
};
