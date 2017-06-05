require "rails_helper"

describe "can search links by text", :js => :true do
  scenario "only the correct results show up" do
    user = create(:user)
    create_list(:link, 3, user: user)
    other = create(:link,
                    title: "Other",
                    url: "http://www.BBC.co.uk",
                    user: user
                  )
    allow_any_instance_of(ApplicationController).to receive(:current_user).and_return(user)

    visit links_path
    fill_in "link-search", with: "link-"

    within('#my-links') do
      expect(page).to have_selector('.link', count: 3)
      expect(page).to_not have_content("Other")
    end
  end

  scenario "search is case insensitve" do
    user = create(:user)
    create_list(:link, 3, user: user)
    other = create(:link,
                    title: "Other",
                    url: "http://www.BBC.co.uk",
                    user: user
                  )
    allow_any_instance_of(ApplicationController).to receive(:current_user).and_return(user)

    visit links_path
    fill_in "link-search", with: "LINK-"

    within('#my-links') do
      expect(page).to have_selector('.link', count: 3)
      expect(page).to_not have_content("Other")
    end
  end
end
