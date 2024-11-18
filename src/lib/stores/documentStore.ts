import { create } from 'zustand';
import { Document } from '@lib/types/document';

interface DocumentState {
  documents: Document[];
  addDocument: (doc: Document) => void;
}

const useDocumentStore = create<DocumentState>((set) => ({
  documents: [],
  addDocument: (doc) =>
    set((state) => ({ documents: [...state.documents, doc] })),
}));

export default useDocumentStore;
