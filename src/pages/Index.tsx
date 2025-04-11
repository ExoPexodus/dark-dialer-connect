
import React from 'react';
import CallForm from '@/components/CallForm';

const Index = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-gradient-to-br from-[#1a1f2c] to-[#2d3748]">
      <div className="w-full max-w-md">
        <CallForm />
        
        <footer className="mt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Dark Dialer Connect. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
