import { Browser, element, by, browser } from "protractor";

describe('Mi prueba',()=>{
    beforeEach(()=>{
        browser.get("inicio");
    });

    it("El tab 1 se asdadsadsad",()=>{
        expect(element(by.css("poto")).getText()).toContain("Cheemy-Bi");
    });
})
    
