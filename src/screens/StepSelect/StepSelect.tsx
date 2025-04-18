import { ChevronDownIcon, PlusIcon, SearchIcon, XIcon } from "lucide-react";
import React, { useState } from "react";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";

export const StepSelect = (): JSX.Element => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<number[]>([1]); // Initially select Character
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Filter options data for mapping
  const filterOptions = [
    { id: 1, name: "Character", category: "tags" },
    { id: 2, name: "Background", category: "tags" },
    { id: 3, name: "Elements", category: "tags" },
    { id: 4, name: "CTA Position", category: "tags" },
    { id: 5, name: "CTA Text", category: "tags" },
    { id: 6, name: "Width", category: "dimensions" },
    { id: 7, name: "Height", category: "dimensions" },
    { id: 8, name: "Clicks", category: "metrics" },
    { id: 9, name: "Conversions", category: "metrics" },
    { id: 10, name: "CTR", category: "metrics" },
  ];

  const handleFilterClick = (id: number) => {
    setSelectedFilters((prev) =>
      prev.includes(id)
        ? prev.filter((filterId) => filterId !== id)
        : [...prev, id]
    );
  };

  const filterOptionsByCategory = (category: string) => {
    return filterOptions
      .filter((option) => option.category === category)
      .filter((option) =>
        option.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
  };

  const getSelectedFilterNames = () => {
    return selectedFilters
      .map((id) => filterOptions.find((option) => option.id === id)?.name)
      .filter(Boolean);
  };

  const removeFilter = (id: number) => {
    setSelectedFilters((prev) => prev.filter((filterId) => filterId !== id));
  };

  return (
    <div className="bg-transparent flex flex-row justify-center w-full">
      <div className="w-[360px]">
        <div className="relative">
          {/* Add Filter Card */}
          <Card className="flex flex-col w-[360px] items-start gap-2 p-3 rounded-xl border border-solid border-[#00000014] shadow-shadow-03-m">
            <CardContent className="p-0 w-full">
              <div 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="px-3 py-0 bg-[#f6fded] border border-solid border-[#0000001f] shadow-shadow-02-thin flex h-10 items-center justify-between relative w-full rounded-lg cursor-pointer hover:bg-[#e8f5d8] transition-colors"
              >
                <div className="inline-flex items-center gap-1.5">
                  <PlusIcon className="w-4 h-4" />
                  <div className="font-body-medium-m-regular text-[#555555] text-[length:var(--body-medium-m-regular-font-size)] tracking-[var(--body-medium-m-regular-letter-spacing)] leading-[var(--body-medium-m-regular-line-height)]">
                    Add Filter
                  </div>
                </div>
                <ChevronDownIcon className="w-4 h-4 text-[#555555]" />
              </div>

              {/* Selected Filters */}
              {selectedFilters.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {getSelectedFilterNames().map((name, index) => (
                    <div
                      key={index}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-[#f4f8f9] rounded-md"
                    >
                      <span className="text-sm text-[#555555]">{name}</span>
                      <XIcon
                        className="w-3 h-3 text-[#555555] cursor-pointer hover:text-[#333333]"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFilter(selectedFilters[index]);
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Filter Selection Card */}
          {isDropdownOpen && (
            <Card className="flex flex-col w-[330px] items-start gap-2 mt-3 mx-auto rounded-xl border border-solid border-[#00000014] shadow-shadow-03-m">
              <CardContent className="p-0 w-full">
                {/* Search Bar */}
                <div className="flex flex-wrap items-center gap-[12px_12px] px-3 py-2.5 relative w-full border-b [border-bottom-style:solid] border-[#0000001f]">
                  <div className="inline-flex items-center relative flex-1">
                    <div className="inline-flex items-center gap-2 relative w-full">
                      <SearchIcon className="w-5 h-5 absolute left-0" />
                      <Input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-8 border-none text-sm placeholder:text-[#999999]"
                        placeholder="Search"
                      />
                    </div>
                  </div>
                </div>

                {/* Tabs */}
                <Tabs defaultValue="tags" className="w-full">
                  <TabsList className="flex h-auto w-full justify-start bg-transparent p-0 gap-4 px-3">
                    <TabsTrigger
                      value="dimensions"
                      className="px-0 py-2 data-[state=inactive]:border-0 data-[state=active]:border-b-2 data-[state=active]:border-[#555555] data-[state=active]:text-[#333333] data-[state=inactive]:text-[#757575] rounded-none bg-transparent"
                    >
                      <span className="font-caption-large-l-semibold text-[length:var(--caption-large-l-semibold-font-size)] tracking-[var(--caption-large-l-semibold-letter-spacing)] leading-[var(--caption-large-l-semibold-line-height)]">
                        Dimensions
                      </span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="tags"
                      className="px-0 py-2 data-[state=inactive]:border-0 data-[state=active]:border-b-2 data-[state=active]:border-[#555555] data-[state=active]:text-[#333333] data-[state=inactive]:text-[#757575] rounded-none bg-transparent"
                    >
                      <span className="font-caption-large-l-semibold text-[length:var(--caption-large-l-semibold-font-size)] tracking-[var(--caption-large-l-semibold-letter-spacing)] leading-[var(--caption-large-l-semibold-line-height)]">
                        Tags
                      </span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="metrics"
                      className="px-0 py-2 data-[state=inactive]:border-0 data-[state=active]:border-b-2 data-[state=active]:border-[#555555] data-[state=active]:text-[#333333] data-[state=inactive]:text-[#757575] rounded-none bg-transparent"
                    >
                      <span className="font-caption-large-l-semibold text-[length:var(--caption-large-l-semibold-font-size)] tracking-[var(--caption-large-l-semibold-letter-spacing)] leading-[var(--caption-large-l-semibold-line-height)]">
                        Metrics
                      </span>
                    </TabsTrigger>
                  </TabsList>

                  {/* Tab Content */}
                  <TabsContent value="tags" className="mt-0">
                    <div className="flex flex-col items-start gap-1 p-2 w-full">
                      {filterOptionsByCategory("tags").map((option) => (
                        <div
                          key={option.id}
                          onClick={() => handleFilterClick(option.id)}
                          className={`flex h-10 items-center gap-1 px-2 py-0 w-full rounded-lg cursor-pointer hover:bg-[#f4f8f9] transition-colors ${
                            selectedFilters.includes(option.id) ? "bg-[#f4f8f9]" : ""
                          }`}
                        >
                          <div className="inline-flex items-center gap-1.5">
                            <div className="font-body-medium-m-regular text-[#555555] text-[length:var(--body-medium-m-regular-font-size)] tracking-[var(--body-medium-m-regular-letter-spacing)] leading-[var(--body-medium-m-regular-line-height)] whitespace-nowrap">
                              {option.name}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="dimensions" className="mt-0">
                    <div className="flex flex-col items-start gap-1 p-2 w-full">
                      {filterOptionsByCategory("dimensions").map((option) => (
                        <div
                          key={option.id}
                          onClick={() => handleFilterClick(option.id)}
                          className={`flex h-10 items-center gap-1 px-2 py-0 w-full rounded-lg cursor-pointer hover:bg-[#f4f8f9] transition-colors ${
                            selectedFilters.includes(option.id) ? "bg-[#f4f8f9]" : ""
                          }`}
                        >
                          <div className="inline-flex items-center gap-1.5">
                            <div className="font-body-medium-m-regular text-[#555555] text-[length:var(--body-medium-m-regular-font-size)] tracking-[var(--body-medium-m-regular-letter-spacing)] leading-[var(--body-medium-m-regular-line-height)] whitespace-nowrap">
                              {option.name}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="metrics" className="mt-0">
                    <div className="flex flex-col items-start gap-1 p-2 w-full">
                      {filterOptionsByCategory("metrics").map((option) => (
                        <div
                          key={option.id}
                          onClick={() => handleFilterClick(option.id)}
                          className={`flex h-10 items-center gap-1 px-2 py-0 w-full rounded-lg cursor-pointer hover:bg-[#f4f8f9] transition-colors ${
                            selectedFilters.includes(option.id) ? "bg-[#f4f8f9]" : ""
                          }`}
                        >
                          <div className="inline-flex items-center gap-1.5">
                            <div className="font-body-medium-m-regular text-[#555555] text-[length:var(--body-medium-m-regular-font-size)] tracking-[var(--body-medium-m-regular-letter-spacing)] leading-[var(--body-medium-m-regular-line-height)] whitespace-nowrap">
                              {option.name}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};