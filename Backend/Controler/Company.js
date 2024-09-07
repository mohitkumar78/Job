
import { Company } from '../Models/company.model.js'


export const RigisterCompany = async (req, res) => {

    try {
        const { CompanyName, description, website, location } = req.body
        const logo = req.file
        if (!CompanyName) {
            return res.status(400).json({
                message: "company name is missing",
                success: false
            })
        }

        let company = await Company.findOne({ name: CompanyName })

        if (company) {
            return res.status(400).json({
                message: "You can't register same company",
                success: false
            })
        }

        company = await Company.create({
            name: CompanyName,
            description: description,
            website: website,
            location: location,
            userId: req.id

        })

        return res.status(200).json(
            {
                company,
                message: "Company Register Sucessfully",
                success: true
            }
        )


    } catch (error) {
        console.log("error occur while rigister the company")
        return res.status(400).json(
            {
                message: "Internal server error",
                success: false
            }
        )
    }

}
export const getCompany = async (req, res) => {
    try {
        const userId = req.id;
        if (!userId) {
            return res.status(400).json({
                message: "user id is not provided",
                success: false
            })
        }

        const comapnies = await Company.find({ userId });
        if (!comapnies) {
            return res.status(404).json({
                message: "internal server error",
                success: false
            })
        }

        return res.status(200).json(
            {
                comapnies,
                message: "comapnies are found",
                success: true
            }

        )

    } catch (error) {
        console.log("error in getcompanies", error)
        res.status(400).json({
            message: "error occur in code",
            success: false
        })
    }

}

export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id
        const company = await Company.findById(companyId)

        if (!company) {
            return res.status(400).json({
                message: "comapany not found",
                success: false
            })
        }
        return res.status(200).json(
            {
                company,
                message: "company found",
                success: true
            }
        )
    } catch (error) {
        console.log("error in finding comapnie by id controller", error)
        return res.status(400).json(
            {
                message: "internal server error",
                success: false
            }
        )
    }
}

export const findComapnyAndUpdate = async (req, res) => {
    try {
        const { CompanyName, description, website, location } = req.body;
        const logo = req.file; // Assuming you're handling file uploads, e.g., via cloudinary
        const companyId = req.params.id
        if (!CompanyName || !description || !website || !location) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        }

        const updateComapny = {
            name: CompanyName,
            description: description,
            website: website,
            location: location,
            // Add logo field if necessary
        };

        // Await the update
        const updatedcompany = await Company.findByIdAndUpdate(companyId, updateComapny, { new: true }); // 'lean()' simplifies the returned object
        console.log(updatedcompany)
        if (!updatedcompany) {
            return res.status(400).json({
                message: "Internal server error or company not found",
                success: false
            });
        }

        return res.status(200).json({
            updatedcompany,
            message: "Company updated successfully",
            success: true
        });

    } catch (error) {
        console.log("Error in updating company", error);
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};
