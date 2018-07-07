import PolymerTestHelper from 'lib/PolymerTestHelper';

export default class PageTestHelper extends PolymerTestHelper {
    static assert(root, asserts = {}) {
        super.assert(root, asserts);

        if (asserts.hasContent) {
            expect(root.shadowRoot.innerHTML.trim().length).not.toBe(0);
        }

        if (asserts.hasOwnProperty('title')) {
            const is = root.tagName.toLowerCase();
            const Page = customElements.get(is);

            expect(Page.title).toEqual(asserts.title);
        }
    }
}
