# TODO: Implement Dropdown for Admin Daerah Region Selection

## Tasks

- [ ] Import dataprovkabkota.json into UserManagement.jsx
- [ ] Add province and city fields to formData state
- [ ] Modify form for admin_daerah role:
  - Add Province dropdown (required)
  - Add City dropdown (optional, depends on selected province)
- [ ] Update handleFormChange to handle province and city selection
- [ ] Update handleSubmit to construct regionName as "Province" or "Province - City"
- [ ] Update handleEdit to parse existing regionName into province and city
- [ ] Update resetForm to include new fields
- [ ] Test the dropdown functionality

## Files to Edit

- src/pages/UserManagement.jsx

## Notes

- Province is required for admin_daerah
- City is optional; if not selected, regionName will be just the province
- regionName format: "Province" or "Province - City"
